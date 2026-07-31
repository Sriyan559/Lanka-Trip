'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, BookOpen, Copy, ExternalLink, FlaskConical, HelpCircle, Menu, Mic, MicOff, Palette, Pencil, Plus, RefreshCw, Search, Scissors, Send, Settings, ShoppingBag, Sparkles, ThumbsDown, ThumbsUp, Trash2, UserRound, Wind, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { beautyAdvisorApi } from '@/lib/api';
import { ADVISOR_LANGUAGES, tAdvisor } from '@/lib/beautyAdvisorTranslations';
import AIAdvisorProductCard from '@/components/layout/AIAdvisorProductCard';
import AIAdvisorRoutine from '@/components/layout/AIAdvisorRoutine';

const FEATURES = [
  { icon: Sparkles, title: 'Build My Skincare Routine', description: 'Create a practical morning and evening routine.', prompt: 'Help me build a personalised skincare routine. Ask one question at a time.' },
  { icon: Palette, title: 'Create a Makeup Guide', description: 'Plan products, finish, and steps for your look.', prompt: 'Help me create a makeup guide. Ask about my desired look and preferences.' },
  { icon: ShoppingBag, title: 'Find Product Matches', description: 'Discover suitable products from SL Beauty.', prompt: 'Find suitable SL Beauty products for me. Ask what you need to narrow the matches.' },
  { icon: Scissors, title: 'Build a Haircare Plan', description: 'Create care steps for your hair and scalp.', prompt: 'Help me build a personalised haircare plan. Ask one question at a time.' },
  { icon: Wind, title: 'Find My Fragrance', description: 'Explore fragrance families, notes, and occasions.', prompt: 'Help me find my fragrance family and suitable SL Beauty fragrances.' },
  { icon: FlaskConical, title: 'Review Ingredients', description: 'Understand cosmetic roles and compatibility.', prompt: 'Help me review a cosmetic ingredient or ingredient list. Ask me to provide it.' },
];

const guestStorageKey = 'slBeautyAdvisorGuestSession';

export default function AIAdvisorPageClient() {
  const { user, isAuthenticated } = useAuth();
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [guestId, setGuestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [voiceState, setVoiceState] = useState('idle');
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [plans, setPlans] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [chatSearch, setChatSearch] = useState('');
  const recognitionRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const rtl = language === 'dv';

  useEffect(() => {
    let id = localStorage.getItem(guestStorageKey);
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      id = window.crypto?.randomUUID?.() || `00000000-0000-4000-8000-${Math.random().toString(16).slice(2, 14).padEnd(12, '0')}`;
      localStorage.setItem(guestStorageKey, id);
    }
    const saved = localStorage.getItem('slBeautyAdvisorLanguage');
    if (ADVISOR_LANGUAGES.some((item) => item.code === saved)) setLanguage(saved);
    setGuestId(id);
    setVoiceSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => recognitionRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!guestId && !isAuthenticated) return;
    let cancelled = false;
    const initialize = async () => {
      setLoading(true); setError('');
      try {
        const started = await beautyAdvisorApi.startConversation(guestId);
        if (cancelled || !started?.conversation) return;
        const conversation = started.conversation;
        setConversationId(conversation.id);
        if (conversation.profile_context?.language) setLanguage(conversation.profile_context.language);
        const history = await beautyAdvisorApi.getConversation(conversation.id, guestId);
        if (!cancelled) setMessages(history?.messages || []);
        const chatList = await beautyAdvisorApi.listConversations(guestId);
        if (!cancelled) setRecentChats(chatList?.conversations || []);
        if (isAuthenticated) {
          const savedPlans = await beautyAdvisorApi.getPlans().catch(() => null);
          if (!cancelled) setPlans(savedPlans?.plans || []);
        }
      } catch { if (!cancelled) setError('The AI Advisor could not load. Please retry.'); }
      finally { if (!cancelled) setLoading(false); }
    };
    initialize();
    return () => { cancelled = true; };
  }, [guestId, isAuthenticated]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [drawerOpen]);

  const loadProducts = async (ids) => {
    const settled = await Promise.allSettled(ids.map((id) => beautyAdvisorApi.getProduct(id)));
    setProducts(settled.filter((item) => item.status === 'fulfilled' && item.value?.id).map((item) => item.value));
  };

  const send = async (preset) => {
    const text = (preset || input).trim();
    if (!text || loading || !conversationId) return;
    setInput(''); setLoading(true); setError(''); setStatus(tAdvisor(language, 'searching'));
    const optimistic = { id: `temp-${Date.now()}`, role: 'user', content: text };
    setMessages((current) => [...current, optimistic]);
    try {
      const response = await beautyAdvisorApi.sendMessage(conversationId, text, guestId);
      if (response?.message) {
        setMessages((current) => [...current, response.message]);
        setRecentChats((current) => current.map((chat) => chat.id === conversationId && (!chat.title || chat.title === 'New conversation') ? { ...chat, title: text.slice(0, 70) } : chat));
        const ids = response.message.structured_data?.recommendedProductIds || [];
        if (ids.length) await loadProducts(ids);
      }
    } catch {
      setMessages((current) => current.filter((message) => message.id !== optimistic.id));
      setInput(text);
      setError('Your message was not sent. It has been restored so you can retry.');
    } finally { setLoading(false); setStatus(''); }
  };

  const changeLanguage = async (next) => {
    setLanguage(next); localStorage.setItem('slBeautyAdvisorLanguage', next);
    if (conversationId) await beautyAdvisorApi.updateProfile(conversationId, { language: next }, guestId).catch(() => toast.error(tAdvisor(next, 'unavailable')));
  };

  const newChat = async () => {
    if (!conversationId || loading) return;
    setLoading(true);
    try {
      const result = await beautyAdvisorApi.newConversation(conversationId, guestId);
      setConversationId(result.conversation.id); setMessages([]); setProducts([]); setDrawerOpen(false); setInput('');
      const chatList = await beautyAdvisorApi.listConversations(guestId);
      setRecentChats(chatList?.conversations || []);
    } catch { toast.error('Your current chat was preserved. Please retry.'); }
    finally { setLoading(false); }
  };

  const openChat = async (chat) => {
    if (loading || chat.id === conversationId) { setDrawerOpen(false); return; }
    setLoading(true); setError('');
    try {
      await beautyAdvisorApi.activateConversation(chat.id, guestId);
      const history = await beautyAdvisorApi.getConversation(chat.id, guestId);
      setConversationId(chat.id); setMessages(history?.messages || []); setProducts([]); setDrawerOpen(false);
      setRecentChats((current) => current.map((item) => ({ ...item, status: item.id === chat.id ? 'active' : 'archived' })));
    } catch { setError('That conversation could not be opened.'); }
    finally { setLoading(false); }
  };

  const renameChat = async (event, chat) => {
    event.stopPropagation();
    const next = window.prompt('Rename conversation', chat.title || 'Beauty conversation')?.trim();
    if (!next) return;
    try {
      await beautyAdvisorApi.renameConversation(chat.id, next, guestId);
      setRecentChats((current) => current.map((item) => item.id === chat.id ? { ...item, title: next } : item));
    } catch { toast.error('Conversation could not be renamed.'); }
  };

  const deleteChat = async (event, chat) => {
    event.stopPropagation();
    if (!window.confirm(`Delete “${chat.title || 'this conversation'}”?`)) return;
    try {
      await beautyAdvisorApi.deleteConversation(chat.id, guestId);
      const remaining = recentChats.filter((item) => item.id !== chat.id);
      setRecentChats(remaining);
      if (chat.id === conversationId) {
        const started = await beautyAdvisorApi.startConversation(guestId);
        setConversationId(started.conversation.id); setMessages([]); setProducts([]);
        const chatList = await beautyAdvisorApi.listConversations(guestId);
        setRecentChats(chatList?.conversations || []);
      }
    } catch { toast.error('Conversation could not be deleted.'); }
  };

  const clearChat = async () => {
    try {
      await beautyAdvisorApi.clearConversation(conversationId, guestId);
      setMessages([]); setProducts([]); setClearOpen(false); setInput(''); inputRef.current?.focus();
    } catch { toast.error('The chat could not be cleared.'); }
  };

  const toggleVoice = () => {
    if (recognitionRef.current) { recognitionRef.current.stop(); return; }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = ADVISOR_LANGUAGES.find((item) => item.code === language)?.speech || 'en-LK';
    recognition.interimResults = false; recognition.continuous = false;
    recognition.onstart = () => setVoiceState('listening');
    recognition.onresult = (event) => { const value = event.results?.[0]?.[0]?.transcript || ''; setInput((current) => `${current}${current ? ' ' : ''}${value}`.slice(0, 1000)); };
    recognition.onerror = (event) => { setVoiceState('error'); toast.error(event.error === 'not-allowed' ? 'Microphone permission was denied.' : 'Voice typing was unavailable.'); };
    recognition.onend = () => { recognitionRef.current = null; setVoiceState('idle'); inputRef.current?.focus(); };
    recognitionRef.current = recognition; recognition.start();
  };

  const savePlan = async (message) => {
    if (!isAuthenticated) { toast.error('Sign in to save a beauty plan.'); return; }
    const data = message.structured_data;
    try {
      const saved = await beautyAdvisorApi.savePlan(data.routine?.[0]?.title || 'My Beauty Plan', { language }, { routine: data.routine }, conversationId);
      if (saved?.plan) setPlans((current) => [saved.plan, ...current]);
      toast.success('Beauty plan saved.');
    } catch { toast.error('The plan could not be saved.'); }
  };

  const feedback = async (id, type) => {
    try { await beautyAdvisorApi.sendFeedback(id, type, guestId); toast.success('Thank you for your feedback.'); }
    catch { toast.error('Feedback could not be saved.'); }
  };

  const sidebar = <aside className="flex h-full flex-col bg-[#111620] text-white">
    <div className="flex items-center gap-3 border-b border-white/10 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-black">SL</span><div><strong className="block">SL Beauty</strong><span className="text-xs text-slate-400">AI Advisor</span></div><button type="button" onClick={() => setDrawerOpen(false)} className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10 lg:hidden" aria-label="Close advisor navigation"><X size={20}/></button></div>
    <nav aria-label="AI Advisor features" className="space-y-1 p-4">
      <button type="button" onClick={() => { setDrawerOpen(false); inputRef.current?.focus(); }} className="flex min-h-11 w-full items-center gap-3 rounded-xl bg-white/10 px-3 text-left text-sm font-semibold"><Sparkles size={17}/>Ask Your Advisor</button>
      {FEATURES.map(({icon:Icon,title,prompt}) => <button key={title} type="button" onClick={() => { setDrawerOpen(false); send(prompt); }} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"><Icon size={17}/>{title}</button>)}
    </nav>
    <div className="min-h-0 border-t border-white/10 p-4"><div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Chats</h2><button type="button" onClick={newChat} className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10" aria-label="Start new chat"><Plus size={18}/></button></div><label className="relative mb-2 block"><span className="sr-only">Search conversations</span><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={chatSearch} onChange={(event) => setChatSearch(event.target.value)} placeholder="Search chats" className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-300"/></label><div className="max-h-52 space-y-1 overflow-y-auto">{recentChats.filter((chat) => (chat.title || '').toLowerCase().includes(chatSearch.toLowerCase())).map((chat) => <div key={chat.id} className={`group grid grid-cols-[minmax(0,1fr)_32px_32px] items-center rounded-xl pr-1 text-sm ${chat.id === conversationId ? 'bg-white/10' : 'hover:bg-white/5'}`}><button type="button" onClick={() => openChat(chat)} className="min-w-0 p-3 text-left"><span className="block truncate">{chat.title || 'New conversation'}</span><span className="mt-1 block text-[11px] text-slate-500">{chat.status === 'active' ? 'Active now' : new Date(chat.updated_at).toLocaleDateString()}</span></button><button type="button" onClick={(event) => renameChat(event, chat)} className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 hover:bg-white/10 group-hover:opacity-100 group-focus-within:opacity-100" aria-label={`Rename ${chat.title}`}><Pencil size={12}/></button><button type="button" onClick={(event) => deleteChat(event, chat)} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-300 opacity-0 hover:bg-red-500/10 group-hover:opacity-100 group-focus-within:opacity-100" aria-label={`Delete ${chat.title}`}><Trash2 size={12}/></button></div>)}</div></div>
    <div className="mt-auto space-y-1 border-t border-white/10 p-4">{plans.slice(0,2).map((plan) => <a key={plan.id} href={beautyAdvisorApi.downloadPlanUrl(plan.id)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-300 hover:bg-white/5" title="Download saved plan"><BookOpen size={17}/><span className="truncate">{plan.title}</span></a>)}<Link href="/settings" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-300 hover:bg-white/5"><Settings size={17}/>Settings</Link><Link href="/help-center" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-300 hover:bg-white/5"><HelpCircle size={17}/>Help & Support</Link><div className="flex items-center gap-3 px-3 pt-3"><UserRound size={18}/><span className="truncate text-sm">{isAuthenticated ? user?.name : 'Guest'}</span></div></div>
  </aside>;

  return <div lang={language} dir={rtl ? 'rtl' : 'ltr'} className="min-h-[calc(100dvh-104px)] overflow-x-hidden bg-[#0e1117] py-3 text-slate-50 sm:py-4 lg:py-6">
    {drawerOpen && <div className="fixed inset-0 z-[400] bg-black/70 lg:hidden" onMouseDown={(event) => event.target === event.currentTarget && setDrawerOpen(false)}><div className="h-full w-[min(86vw,300px)]" dir="ltr">{sidebar}</div></div>}
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5">
    <div className="grid min-h-[calc(100dvh-128px)] w-full min-w-0 overflow-hidden rounded-[18px] border border-white/10 bg-[#151a23] sm:min-h-[calc(100dvh-136px)] sm:rounded-[22px] lg:min-h-[calc(100dvh-240px)] lg:grid-cols-[260px_minmax(0,1fr)] lg:rounded-[28px]">
      <div className="hidden lg:block" dir="ltr">{sidebar}</div>
      <main className="relative flex min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_10%,rgba(56,189,248,.12),transparent_35%)] [overflow-wrap:anywhere]">
        <header className="flex min-h-16 items-center gap-3 border-b border-white/10 px-4 sm:px-6"><button type="button" onClick={() => setDrawerOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10 lg:hidden" aria-label="Open advisor navigation"><Menu size={20}/></button><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-200">● Advisor online</span><div className="ml-auto flex items-center gap-2"><select value={language} onChange={(event) => changeLanguage(event.target.value)} className="h-11 max-w-[150px] rounded-xl border border-white/10 bg-[#1b202a] px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-300" aria-label="Advisor language">{ADVISOR_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><button type="button" onClick={() => setClearOpen(true)} disabled={!messages.length} className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30" aria-label="Clear current chat"><Trash2 size={18}/></button></div></header>

        <div className={`flex-1 overflow-y-auto px-4 py-7 sm:px-6 ${messages.length ? '' : 'flex items-center'}`} aria-live="polite">
          <div className="mx-auto w-full max-w-5xl">
            {!messages.length && !loading ? <>
              <section className="text-center"><div className="advisor-page-diamond relative mx-auto h-28 w-36 sm:h-36 sm:w-48 lg:h-44 lg:w-56"><Image src="/images/ai-advisor/diamond-icon.png" alt="" fill priority sizes="224px" className="object-contain"/></div><h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Your Personal Beauty Advisor</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">{isAuthenticated && user?.name ? `Hello, ${user.name.split(' ')[0]}. ` : ''}Ask questions, create routines, explore ingredients, and discover real SL Beauty products suited to your preferences.</p></section>
              <Composer input={input} setInput={setInput} send={send} loading={loading} language={language} inputRef={inputRef} voiceSupported={voiceSupported} voiceState={voiceState} toggleVoice={toggleVoice}/>
              <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Advisor features">{FEATURES.map(({icon:Icon,title,description,prompt}) => <button key={title} type="button" onClick={() => send(prompt)} className="group min-h-32 rounded-2xl border border-white/10 bg-white/[.045] p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[.07] focus:outline-none focus:ring-2 focus:ring-cyan-300"><Icon className="text-cyan-200" size={23}/><strong className="mt-4 block text-sm">{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span></button>)}</section>
            </> : <section className="space-y-5" aria-label="Conversation">{messages.map((message) => <Message key={message.id} message={message} language={language} products={products} feedback={feedback} savePlan={savePlan} isAuthenticated={isAuthenticated}/>)}{loading && <div className="flex items-center gap-2 text-sm text-slate-400"><RefreshCw size={15} className="animate-spin"/>{status || 'Preparing your answer…'}</div>}<div ref={endRef}/></section>}
          </div>
        </div>
        {messages.length > 0 && <div className="border-t border-white/10 bg-[#0e1117]/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:px-6"><div className="mx-auto max-w-5xl"><Composer input={input} setInput={setInput} send={send} loading={loading} language={language} inputRef={inputRef} voiceSupported={voiceSupported} voiceState={voiceState} toggleVoice={toggleVoice} compact/></div></div>}
        {error && <div className="absolute bottom-28 left-1/2 flex w-[min(90%,600px)] -translate-x-1/2 items-center gap-2 rounded-xl border border-red-400/30 bg-red-950/95 p-3 text-sm text-red-100"><AlertCircle size={17}/>{error}</div>}
      </main>
    </div></div>
    {clearOpen && <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 p-4"><div role="alertdialog" aria-modal="true" aria-labelledby="clear-title" className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1b202a] p-6"><h2 id="clear-title" className="text-lg font-bold">Clear this chat?</h2><p className="mt-2 text-sm text-slate-400">This removes the current messages and temporary profile context. It cannot be undone.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setClearOpen(false)} className="min-h-11 rounded-xl px-4 hover:bg-white/10">Cancel</button><button type="button" onClick={clearChat} className="min-h-11 rounded-xl bg-red-600 px-4 font-semibold">Clear Chat</button></div></div></div>}
    <style jsx global>{`@keyframes advisorPageFloat{0%,100%{transform:translateY(0);filter:drop-shadow(0 0 18px rgba(125,211,252,.5))}50%{transform:translateY(-7px);filter:drop-shadow(0 0 34px rgba(196,181,253,.8))}}.advisor-page-diamond{animation:advisorPageFloat 3.5s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.advisor-page-diamond{animation:none;filter:drop-shadow(0 0 24px rgba(125,211,252,.7))}}`}</style>
  </div>;
}

function Composer({ input, setInput, send, loading, language, inputRef, voiceSupported, voiceState, toggleVoice, compact = false }) {
  return <form onSubmit={(event) => { event.preventDefault(); send(); }} className={`${compact ? '' : 'mx-auto mt-8'} max-w-4xl rounded-2xl border border-white/15 bg-[#1b202a]/95 p-2 shadow-2xl shadow-black/30 focus-within:border-cyan-200/40 focus-within:ring-2 focus-within:ring-cyan-300/20`}><textarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value.slice(0,1000))} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); } }} rows={compact ? 1 : 3} placeholder={tAdvisor(language,'placeholder')} className="max-h-32 min-h-12 w-full resize-none bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500" aria-label="Message SL Beauty AI Advisor" disabled={loading}/><div className="flex items-center justify-between px-2 pb-1"><span className={`text-[11px] ${input.length > 900 ? 'text-amber-300' : 'text-slate-600'}`}>{input.length > 800 ? `${input.length}/1000` : ''}</span><div className="flex gap-2">{voiceSupported && <button type="button" onClick={toggleVoice} className={`flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs ${voiceState === 'listening' ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-200 hover:bg-white/15'}`} aria-label={voiceState === 'listening' ? 'Stop voice typing' : 'Start voice typing'}>{voiceState === 'listening' ? <MicOff size={16}/> : <Mic size={16}/>}<span className="ml-1 hidden sm:inline">{voiceState === 'listening' ? 'Listening' : 'Voice'}</span></button>}<button type="submit" disabled={loading || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black hover:bg-cyan-100 disabled:bg-white/10 disabled:text-slate-600" aria-label="Send message"><Send size={17}/></button></div></div></form>;
}

function Message({ message, language, products, feedback, savePlan, isAuthenticated }) {
  const assistant = message.role === 'assistant' || message.role === 'model';
  const data = message.structured_data || {};
  const matched = products.filter((product) => data.recommendedProductIds?.includes(String(product.id)));
  return <article lang={data.language || language} dir={(data.language || language) === 'dv' ? 'rtl' : 'ltr'} className={`flex min-w-0 ${assistant ? 'justify-start' : 'justify-end'}`}><div className={`min-w-0 max-w-[min(88%,760px)] space-y-3 [overflow-wrap:anywhere] ${assistant ? '' : 'text-right'}`}><div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${assistant ? 'border border-white/10 bg-white/[.055] text-slate-200' : 'bg-gradient-to-r from-fuchsia-700 to-violet-700 text-white'}`}>{message.content}</div>{assistant && data.routine?.length > 0 && <div className="min-w-0 overflow-hidden rounded-2xl bg-white text-slate-900"><AIAdvisorRoutine routine={data.routine} products={products}/><button type="button" onClick={() => savePlan(message)} className="mx-3 mb-3 flex min-h-11 items-center gap-2 rounded-xl bg-violet-700 px-4 text-xs font-bold text-white"><BookOpen size={15}/>{isAuthenticated ? 'Save Beauty Plan' : 'Sign in to save this plan'}</button></div>}{assistant && matched.length > 0 && <div className="grid min-w-0 gap-3 sm:grid-cols-2">{matched.map((product) => <AIAdvisorProductCard key={product.id} product={product} reason="Database-verified recommendation"/>)}</div>}{assistant && data.sources?.length > 0 && <details className="min-w-0 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm"><summary className="cursor-pointer font-semibold">{tAdvisor(language,'sources')} ({data.sources.length})</summary><ol className="mt-3 min-w-0 space-y-2">{data.sources.map((source,index) => <li key={source.url} className="min-w-0"><a href={source.url} target="_blank" rel="noopener noreferrer" className="break-words text-cyan-200 underline underline-offset-2">[{index+1}] {source.title} <ExternalLink size={12} className="inline"/></a><span className="block text-xs text-slate-500">{source.publisher}</span></li>)}</ol></details>}{assistant && message.id && <div className="flex flex-wrap items-center gap-1"><button type="button" onClick={() => navigator.clipboard?.writeText(message.content).then(() => toast.success('Copied.'))} className="flex min-h-11 items-center gap-1 rounded-lg px-2 text-xs text-slate-500 hover:bg-white/5"><Copy size={13}/>Copy</button><button type="button" onClick={() => feedback(message.id,'helpful')} className="flex min-h-11 items-center gap-1 rounded-lg px-2 text-xs text-slate-500 hover:bg-white/5"><ThumbsUp size={13}/>Helpful</button><button type="button" onClick={() => feedback(message.id,'not_helpful')} className="flex min-h-11 items-center gap-1 rounded-lg px-2 text-xs text-slate-500 hover:bg-white/5"><ThumbsDown size={13}/>Not helpful</button></div>}</div></article>;
}
