'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Trash2, BookOpen, AlertCircle, ShoppingBag, MessageSquarePlus, Mic, MicOff, RefreshCw, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { beautyAdvisorApi } from '@/lib/api';
import { starRating, formatCurrency } from '@/lib/utils';
import AISkinTypeSelector from './AISkinTypeSelector';
import AIAdvisorProductCard from './AIAdvisorProductCard';
import AIAdvisorRoutine from './AIAdvisorRoutine';
import toast from 'react-hot-toast';

const QUICK_ACTIONS = [
  { label: 'Build my skincare routine', text: 'Recommend a personal skincare routine.' },
  { label: 'Find products for my skin type', text: 'Show me product matches for my skin type.' },
  { label: 'Recommend makeup for me', text: 'What makeup products do you suggest?' },
  { label: 'Help me choose a fragrance', text: 'I need help selecting a fragrance.' },
  { label: 'Create a haircare routine', text: 'Suggest a healthy haircare routine.' },
];

export default function AIBeautyAdvisorModal({ isOpen, onClose, originElement }) {
  const { user, isAuthenticated } = useAuth();
  
  // State
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [skinType, setSkinType] = useState('not_sure');
  const [profileContext, setProfileContext] = useState({});
  const [errorState, setErrorState] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceState, setVoiceState] = useState('idle');
  const [voiceStatus, setVoiceStatus] = useState('');
  
  // Curated Plan State
  const [isCuratingPlan, setIsCuratingPlan] = useState(false);
  const [curationStep, setCurationStep] = useState(0); // 0: select skin type, 1: select skin concern

  // Show Matches inline panel state
  const [showMatchesPanel, setShowMatchesPanel] = useState(false);
  const [groundedProducts, setGroundedProducts] = useState([]);

  // Refs for accessibility
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const clearBtnRef = useRef(null);
  const cancelClearBtnRef = useRef(null);
  const clearDialogRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceTimeoutRef = useRef(null);

  // Greet user
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const greeting = isAuthenticated 
    ? `Welcome, ${firstName}! How can I help with your beauty routine today?`
    : `Welcome! How can I help with your beauty routine today?`;

  // Get or Create guest session ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let gid = localStorage.getItem('slBeautyAdvisorGuestSession');
      if (!gid || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(gid)) {
        // Generate random UUID
        gid = window.crypto?.randomUUID?.() || '00000000-0000-4000-8000-' + Math.random().toString(16).slice(2, 14).padEnd(12, '0');
        localStorage.setItem('slBeautyAdvisorGuestSession', gid);
      }
      setGuestSessionId(gid);
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(Boolean(SpeechRecognition));

    return () => {
      if (voiceTimeoutRef.current) window.clearTimeout(voiceTimeoutRef.current);
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isOpen) return;
    if (voiceTimeoutRef.current) window.clearTimeout(voiceTimeoutRef.current);
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setVoiceState('idle');
    setVoiceStatus('');
    setShowClearConfirm(false);
  }, [isOpen]);

  useEffect(() => {
    if (showClearConfirm) cancelClearBtnRef.current?.focus();
  }, [showClearConfirm]);

  // Initialize Conversation
  useEffect(() => {
    if (!isOpen) return;

    const initConversation = async () => {
      setIsLoading(true);
      setErrorState(null);
      try {
        const res = await beautyAdvisorApi.startConversation(guestSessionId);
        if (res.success && res.conversation) {
          setConversationId(res.conversation.id);
          setProfileContext(res.conversation.profile_context || {});
          if (res.conversation.profile_context?.skin_type) {
            setSkinType(res.conversation.profile_context.skin_type);
          }

          // Fetch messages
          const msgRes = await beautyAdvisorApi.getConversation(res.conversation.id, guestSessionId);
          if (msgRes.success) {
            setMessages(msgRes.messages || []);
          }
        }
      } catch (err) {
        console.error(err);
        setErrorState('Our Beauty Advisor is temporarily unavailable. Please try again shortly.');
      } finally {
        setIsLoading(false);
      }
    };

    if (guestSessionId || isAuthenticated) {
      initConversation();
    }
  }, [isOpen, guestSessionId, isAuthenticated]);

  // Focus trap and accessibility keyboard handlers
  useEffect(() => {
    if (!isOpen) return;

    // Body overflow lock
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showClearConfirm) {
          e.preventDefault();
          setShowClearConfirm(false);
          window.setTimeout(() => clearBtnRef.current?.focus(), 0);
          return;
        }
        onClose();
      }

      // Tab key focus trap
      if (e.key === 'Tab') {
        const focusRoot = showClearConfirm ? clearDialogRef.current : dialogRef.current;
        if (!focusRoot) return;
        const focusableElements = focusRoot.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus
      if (originElement) {
        originElement.focus();
      }
    };
  }, [isOpen, onClose, originElement, showClearConfirm]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle send message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading || !conversationId) return;

    setInputText('');
    setErrorState(null);
    setIsLoading(true);

    // Optimistically add user message
    const tempUserMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await beautyAdvisorApi.sendMessage(conversationId, text, guestSessionId);
      if (res.success && res.message) {
        setMessages(prev => [...prev, res.message]);
        
        // Extract grounded products from the structured response if present
        if (res.message.structured_data?.recommendedProductIds?.length > 0) {
          fetchMatchedProducts(res.message.structured_data.recommendedProductIds);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorState('Could not send message. Please check your connection and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch matched products details
  const fetchMatchedProducts = async (ids) => {
    try {
      // Loop and fetch matching products
      const prods = [];
      for (const id of ids) {
        const prodRes = await fetch(`http://localhost:8000/api/products/${id}`);
        if (prodRes.ok) {
          const body = await prodRes.json();
          if (body.success && body.id) {
            prods.push(body);
          }
        }
      }
      setGroundedProducts(prods);
    } catch (err) {
      console.error('Error fetching grounded products details:', err);
    }
  };

  // Handle skin type selection
  const handleSelectSkinType = async (type) => {
    setSkinType(type);
    if (!conversationId) return;

    try {
      const res = await beautyAdvisorApi.updateProfile(conversationId, { skin_type: type }, guestSessionId);
      if (res.success) {
        setProfileContext(res.conversation.profile_context || {});
        toast.success(`Skin type updated to ${type.toUpperCase()}`);
        
        // Progressive chat trigger
        if (isCuratingPlan) {
          setCurationStep(1); // Proceed to concern selection
        } else {
          handleSendMessage(`Recommend products suited for my ${type} skin.`);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not update skin profile.');
    }
  };

  // Handle skin concern selection
  const handleSelectSkinConcern = async (concern) => {
    if (!conversationId) return;

    try {
      const res = await beautyAdvisorApi.updateProfile(conversationId, { skin_concern: concern }, guestSessionId);
      if (res.success) {
        setProfileContext(res.conversation.profile_context || {});
        setIsCuratingPlan(false);
        setCurationStep(0);
        toast.success(`Profile updated with concern: ${concern.toUpperCase()}`);
        handleSendMessage(`Create a complete routine for my ${skinType} skin focusing on ${concern}.`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not update profile concerns.');
    }
  };

  const resetTemporaryConversationState = () => {
    setMessages([]);
    setInputText('');
    setGroundedProducts([]);
    setShowMatchesPanel(false);
    setIsCuratingPlan(false);
    setCurationStep(0);
    setSkinType('not_sure');
    setProfileContext({});
    setErrorState(null);
  };

  const handleNewConversation = async () => {
    if (!conversationId || isLoading) return;
    setIsLoading(true);
    setErrorState(null);

    try {
      const res = await beautyAdvisorApi.newConversation(conversationId, guestSessionId);
      if (res.success && res.conversation) {
        setConversationId(res.conversation.id);
        resetTemporaryConversationState();
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not start a new chat. Your current chat was preserved.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = async () => {
    if (!conversationId || isLoading) return;
    setIsLoading(true);
    try {
      const res = await beautyAdvisorApi.clearConversation(conversationId, guestSessionId);
      if (res.success) {
        resetTemporaryConversationState();
        setShowClearConfirm(false);
        toast.success('Chat cleared successfully.');
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not clear this chat. Your messages were preserved.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopVoiceTyping = () => {
    setVoiceState('processing');
    setVoiceStatus('Processing voice input…');
    recognitionRef.current?.stop();
  };

  const startVoiceTyping = () => {
    if (!voiceSupported || recognitionRef.current) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    let receivedResult = false;
    let recognitionFailed = false;
    let timedOut = false;

    recognition.onstart = () => {
      setVoiceState('listening');
      setVoiceStatus('Listening…');
      voiceTimeoutRef.current = window.setTimeout(() => {
        timedOut = true;
        recognition.stop();
      }, 10000);
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        receivedResult = true;
        setInputText((current) => `${current.trim()}${current.trim() ? ' ' : ''}${transcript}`.slice(0, 1000));
        setVoiceStatus('Voice text added. Review it before sending.');
      }
    };
    recognition.onerror = (event) => {
      recognitionFailed = true;
      const status = event.error === 'not-allowed' || event.error === 'service-not-allowed'
        ? 'Microphone access was denied. Enable microphone permission in your browser to use voice typing.'
        : event.error === 'no-speech'
          ? 'No speech was detected. Please try again.'
          : 'Voice typing could not start. Please try again.';
      setVoiceState('error');
      setVoiceStatus(status);
    };
    recognition.onend = () => {
      if (voiceTimeoutRef.current) window.clearTimeout(voiceTimeoutRef.current);
      voiceTimeoutRef.current = null;
      recognitionRef.current = null;
      setVoiceState((current) => current === 'error' ? current : 'idle');
      if (!receivedResult && !recognitionFailed) {
        setVoiceStatus(timedOut ? 'No speech was detected. Please try again.' : 'Voice typing stopped.');
      }
      inputRef.current?.focus();
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setVoiceState('error');
      setVoiceStatus('Voice typing could not start. Please try again.');
    }
  };

  // Handle Save Beauty Routine Plan
  const handleSavePlan = async (title, routine, context) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save your curated routine.');
      return;
    }

    try {
      const res = await beautyAdvisorApi.savePlan(title, context, { routine }, conversationId);
      if (res.success) {
        toast.success('Your Curated Beauty Plan was saved successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Could not save beauty plan.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-advisor-title"
        className="fixed z-50 flex flex-col bg-white border border-[#edebeb] shadow-2xl transition-all
                   right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2
                   w-[calc(100vw-20px)] max-h-[92dvh] rounded-[24px]
                   md:right-6 md:bottom-6 md:translate-x-0 md:translate-y-0
                   md:w-[460px] md:max-h-[85vh]"
        style={{
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 0 40px rgba(59, 130, 246, 0.08)'
        }}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#f3f1f0] bg-gradient-to-r from-primary-50/50 to-pink-50/50 rounded-t-[24px] select-none">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* Glowing Diamond Icon */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-800 to-rose-500 flex items-center justify-center shadow-md animate-pulse">
              <svg width="18" height="18" viewBox="0 0 64 64" fill="none" className="text-white">
                <polygon points="32,6 50,22 32,38 14,22" fill="#ffffff" />
                <polygon points="32,38 50,22 32,58" fill="#e0f2fe" opacity="0.8" />
                <polygon points="32,38 14,22 32,58" fill="#bae6fd" opacity="0.9" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 id="ai-advisor-title" className="text-xs sm:text-sm font-bold tracking-tight text-gray-800 uppercase">
                SL Beauty AI Advisor
              </h3>
              <p className="text-[9px] sm:text-[10px] font-bold text-primary-800 uppercase tracking-widest leading-none mt-0.5">
                Your Personal Beauty Curator
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={handleNewConversation}
              disabled={isLoading || !conversationId}
              title="New Chat"
              className="flex h-11 w-11 items-center justify-center text-[#8c7e7b] hover:text-primary-700 rounded-xl hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 transition-colors disabled:opacity-40"
              aria-label="Start a new AI Advisor chat"
            >
              <MessageSquarePlus size={17} />
            </button>
            <button
              ref={clearBtnRef}
              type="button"
              onClick={() => setShowClearConfirm(true)}
              disabled={isLoading || !conversationId}
              title="Clear Chat"
              className="flex h-11 w-11 items-center justify-center text-[#8c7e7b] hover:text-primary-700 rounded-xl hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 transition-colors disabled:opacity-40"
              aria-label="Clear current AI Advisor chat"
            >
              <Trash2 size={17} />
            </button>
            {/* Close Modal */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center text-[#8c7e7b] hover:text-primary-700 rounded-xl hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 transition-colors"
              aria-label="Close AI Beauty Advisor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfbfa]"
          aria-live="polite"
        >
          {/* Welcome Greet Bubble */}
          <div className="flex gap-2.5 max-w-[85%]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary-800 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0 select-none">
              AI
            </div>
            <div className="bg-white rounded-2xl border border-[#edebeb] p-3 text-xs sm:text-sm text-gray-700 leading-relaxed shadow-sm">
              <p className="font-semibold text-gray-800">{greeting}</p>
              <p className="mt-1 text-gray-500 text-[11px] sm:text-xs">
                Ask me about routines, makeup, matching shades, ingredient safety, or finding the perfect product!
              </p>
            </div>
          </div>

          {/* Render Messages */}
          {messages.map((msg, index) => {
            const isAssistant = msg.role === 'assistant' || msg.role === 'model';
            const data = msg.structured_data || {};

            return (
              <div
                key={msg.id || index}
                className={`flex gap-2.5 max-w-[85%] ${
                  isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0 select-none ${
                    isAssistant
                      ? 'bg-gradient-to-r from-primary-800 to-rose-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {isAssistant ? 'AI' : 'Me'}
                </div>

                {/* Message Bubble */}
                <div className="space-y-3">
                  <div
                    className={`rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isAssistant
                        ? 'bg-white border border-[#edebeb] text-gray-700'
                        : 'bg-gradient-to-r from-primary-800 to-rose-500 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Render routines and recommended products if assistant message has structured details */}
                  {isAssistant && data.routine && data.routine.length > 0 && (
                    <div className="w-full">
                      <AIAdvisorRoutine routine={data.routine} products={groundedProducts} />
                      
                      {isAuthenticated ? (
                        <button
                          type="button"
                          onClick={() => handleSavePlan(data.routine[0]?.title || 'Curated Routine', data.routine, profileContext)}
                          className="mt-2 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-[11px] sm:text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer"
                        >
                          <BookOpen size={13} />
                          Save Curated Routine Plan
                        </button>
                      ) : (
                        <div className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 p-2 rounded-xl text-center italic mt-2">
                          💡 Log in to save this routine to your profile.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Recommended Products Row */}
                  {isAssistant && data.recommendedProductIds && data.recommendedProductIds.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 w-[280px] sm:w-[320px]">
                      {groundedProducts
                        .filter(p => data.recommendedProductIds.includes(String(p.id)))
                        .map((prod) => (
                          <AIAdvisorProductCard
                            key={prod.id}
                            product={prod}
                            reason={data.reply?.includes(prod.name) ? 'Recommended match' : null}
                          />
                        ))}
                    </div>
                  )}

                  {/* Safety Disclaimer */}
                  {isAssistant && data.disclaimer && (
                    <div className="flex gap-1.5 p-2 bg-amber-50/60 border border-amber-100/50 rounded-xl max-w-sm">
                      <AlertCircle size={13} className="text-amber-700 shrink-0 mt-0.5" />
                      <span className="text-[9px] sm:text-[10px] text-amber-800 leading-normal">
                        {data.disclaimer}
                      </span>
                    </div>
                  )}

                  {/* Follow-up question suggestions / Quick replies */}
                  {isAssistant && data.quickReplies && data.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {data.quickReplies.map((replyText, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(replyText)}
                          className="px-3 py-1.5 bg-white border border-primary-200 hover:bg-primary-50/50 hover:border-primary-300 text-primary-800 rounded-full text-[10px] sm:text-xs transition-colors cursor-pointer"
                        >
                          {replyText}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Curation Progressive Selector Panel */}
          {isCuratingPlan && (
            <div className="bg-white border border-[#edebeb] rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-primary-800 select-none">
                <Sparkles size={16} />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Curating Your Beauty Plan
                </h4>
              </div>
              
              {curationStep === 0 && (
                <div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-3">
                    Let&apos;s identify your skin type to build the perfect skincare balance.
                  </p>
                  <AISkinTypeSelector
                    selectedType={skinType}
                    onSelect={handleSelectSkinType}
                  />
                </div>
              )}

              {curationStep === 1 && (
                <div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-2">
                    What is your primary skincare target concern?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Hydration', 'Acne & Blemishes', 'Anti-Aging', 'Brightening / Dark Spots', 'Redness / Sensitivity'].map((concern) => (
                      <button
                        key={concern}
                        type="button"
                        onClick={() => handleSelectSkinConcern(concern)}
                        className="p-2.5 border border-[#edebeb] hover:border-primary-400 rounded-xl text-center text-xs font-semibold text-gray-700 bg-white hover:bg-primary-50/30 cursor-pointer"
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2.5 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary-800 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0 select-none animate-pulse">
                AI
              </div>
              <div className="bg-white rounded-2xl border border-[#edebeb] p-3 text-xs text-gray-500 flex items-center gap-1.5 shadow-sm select-none">
                <RefreshCw size={12} className="animate-spin text-primary-700" />
                Searching grounding database and formulating advice...
              </div>
            </div>
          )}

          {/* Error State Banner */}
          {errorState && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-2xl flex gap-2">
              <ShieldAlert className="text-red-600 shrink-0" size={16} />
              <div className="text-xs text-red-800">
                {errorState}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Curation Quick Actions bar when chat history is empty */}
        {messages.length === 0 && !isLoading && (
          <div className="p-3 border-t border-[#f3f1f0] bg-white space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none">
              Suggested Prompts
            </p>
            <div className="flex flex-col gap-1.5">
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(action.text)}
                  className="w-full text-left p-2 bg-[#fcfbfa] hover:bg-[#fff9f8] border border-[#edebeb] hover:border-primary-200 rounded-xl text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  ✨ {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Inline Matches Display Drawer */}
        {showMatchesPanel && (
          <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#edebeb] rounded-t-[24px] p-4 max-h-[70%] overflow-y-auto z-10 shadow-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-[#f3f1f0] pb-2">
              <div className="flex items-center gap-1.5">
                <ShoppingBag size={16} className="text-primary-700" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800">
                  Your Matched Products ({groundedProducts.length})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowMatchesPanel(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                Close
              </button>
            </div>
            
            {groundedProducts.length === 0 ? (
              <div className="text-xs text-gray-400 text-center py-6">
                No product matches found yet in this conversation session.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {groundedProducts.map((prod) => (
                  <AIAdvisorProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sticky Composer */}
        <div className="p-3 border-t border-[#f3f1f0] bg-white rounded-b-[24px]">
          {/* Action Row */}
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => {
                setIsCuratingPlan(true);
                setCurationStep(0);
              }}
              className="flex-1 py-2 bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-white text-[10px] sm:text-xs font-bold rounded-xl uppercase tracking-wider hover:opacity-95 shadow-sm border-0 cursor-pointer flex items-center justify-center gap-1"
            >
              <Sparkles size={11} /> Start My Curated Skincare Plan
            </button>
            
            <button
              type="button"
              onClick={() => setShowMatchesPanel(prev => !prev)}
              className="px-3 py-2 border border-[#d9c7c3] hover:bg-[#fff9f8] text-gray-700 text-[10px] sm:text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer"
            >
              Show Matches
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border border-[#edebeb] rounded-xl p-1 bg-[#fcfbfa] focus-within:ring-1 focus-within:ring-primary-600 focus-within:border-primary-600"
          >
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              maxLength={1000}
              rows={1}
              placeholder="Ask about skincare, makeup, fragrance, or products..."
              className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-xs sm:text-sm text-gray-800 outline-none placeholder:text-gray-400 border-0"
              disabled={isLoading}
              aria-label="Ask about skincare, makeup, fragrance, or products"
            />
            {voiceSupported && (
              <button
                type="button"
                onClick={voiceState === 'listening' ? stopVoiceTyping : startVoiceTyping}
                disabled={voiceState === 'processing'}
                aria-label={voiceState === 'listening' ? 'Stop voice typing' : 'Start voice typing'}
                aria-pressed={voiceState === 'listening'}
                title="Voice typing uses your browser’s speech-recognition service. Review the text before sending."
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 ${voiceState === 'listening' ? 'voice-listening-indicator bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} disabled:opacity-50`}
              >
                {voiceState === 'listening' ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
          <p className="mt-1 min-h-4 px-1 text-[10px] text-gray-500" aria-live="polite">
            {voiceStatus || (!voiceSupported ? 'Voice typing is not supported in this browser.' : '')}
          </p>
        </div>

        {showClearConfirm && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[24px] bg-black/35 p-4" onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowClearConfirm(false);
              window.setTimeout(() => clearBtnRef.current?.focus(), 0);
            }
          }}>
            <div ref={clearDialogRef} role="alertdialog" aria-modal="true" aria-labelledby="clear-chat-title" aria-describedby="clear-chat-description" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
              <h4 id="clear-chat-title" className="text-base font-bold text-gray-900">Clear this conversation?</h4>
              <p id="clear-chat-description" className="mt-2 text-sm leading-6 text-gray-600">This will remove all messages and recommendations from the current chat. This action cannot be undone.</p>
              <div className="mt-5 flex justify-end gap-2">
                <button ref={cancelClearBtnRef} type="button" onClick={() => {
                  setShowClearConfirm(false);
                  window.setTimeout(() => clearBtnRef.current?.focus(), 0);
                }} className="min-h-11 rounded-xl border border-gray-300 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700">Cancel</button>
                <button type="button" onClick={handleClearConversation} disabled={isLoading} className="min-h-11 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:opacity-50">Clear Chat</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
