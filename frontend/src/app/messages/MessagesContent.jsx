'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Send, ChevronLeft, Search, BadgeCheck, MessageSquare } from 'lucide-react';
import { userApi } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    supplier: { name: 'Lanka Tea Exports (Pvt) Ltd.', verified: true, image: 'https://placehold.co/48x48/e8f5e9/155e2c?text=LTE' },
    unread: 2,
    lastMessageAt: '10:42 AM',
    messages: [
      { from: 'them', text: 'Thank you for your interest in our BOPF tea. Could you confirm the destination port?', time: '10:12 AM' },
      { from: 'me',   text: 'Sure — destination is Jebel Ali Port, Dubai.', time: '10:20 AM' },
      { from: 'them', text: 'Great, we can ship FOB Colombo. For 200kg the price would be $11.80/kg.', time: '10:35 AM' },
      { from: 'them', text: 'Would you also like a sample before confirming the full order?', time: '10:42 AM' },
    ],
  },
  {
    id: 2,
    supplier: { name: 'Gem Palace LK', verified: true, image: 'https://placehold.co/48x48/e8eaf6/1a237e?text=Gem' },
    unread: 0,
    lastMessageAt: 'Yesterday',
    messages: [
      { from: 'me',   text: 'Hi, do you have certified blue sapphires above 2 carats?', time: 'Yesterday, 4:02 PM' },
      { from: 'them', text: 'Yes, we have GIA-certified pieces from 2 to 5 carats. I can send a catalogue.', time: 'Yesterday, 4:30 PM' },
    ],
  },
  {
    id: 3,
    supplier: { name: 'Spice Garden Export', verified: false, image: 'https://placehold.co/48x48/fbe9e7/bf360c?text=Spice' },
    unread: 0,
    lastMessageAt: 'Mon',
    messages: [
      { from: 'them', text: 'Your RFQ for cinnamon sticks has been received. We will quote within 24 hours.', time: 'Mon, 9:15 AM' },
    ],
  },
];

export default function MessagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeId = searchParams.get('id');

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await userApi.messages();
        setConversations(data.data || data.conversations || []);
      } catch {
        setConversations(MOCK_CONVERSATIONS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Loading messages…" />;

  const active = conversations.find((c) => String(c.id) === String(activeId)) || conversations[0] || null;
  const filtered = conversations.filter((c) => c.supplier.name.toLowerCase().includes(search.toLowerCase()));

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, messages: [...c.messages, { from: 'me', text: draft.trim(), time: 'Just now' }] }
          : c
      )
    );
    setDraft('');
    // POST to the Laravel inbox endpoint goes here once available
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 160px)', minHeight: 480 }}>
      <div className="flex h-full">
        {/* ── Conversation list ── */}
        <aside className={`w-full sm:w-80 flex-shrink-0 border-r border-gray-100 flex flex-col ${active && activeId ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-400">No conversations yet.</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => router.push(`/messages?id=${c.id}`)}
                  className={`w-full flex items-start gap-3 p-3.5 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    active?.id === c.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <Image src={c.supplier.image} alt="" width={44} height={44} unoptimized className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-800 truncate flex items-center gap-1">
                        {c.supplier.name}
                        {c.supplier.verified && <BadgeCheck size={12} className="text-primary-700 flex-shrink-0" />}
                      </span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">{c.lastMessageAt}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-xs text-gray-400 truncate">{c.messages[c.messages.length - 1]?.text}</p>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 flex-shrink-0 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{c.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* ── Thread ── */}
        <div className={`flex-1 flex flex-col min-w-0 ${active && activeId ? 'flex' : 'hidden sm:flex'}`}>
          {!active ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
              <MessageSquare size={40} />
              <p className="text-sm text-gray-400 mt-2">Select a conversation</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 p-3.5 border-b border-gray-100">
                <button onClick={() => router.push('/messages')} className="sm:hidden text-gray-400 hover:text-gray-600">
                  <ChevronLeft size={20} />
                </button>
                <Image src={active.supplier.image} alt="" width={36} height={36} unoptimized className="w-9 h-9 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-800 flex items-center gap-1 truncate">
                    {active.supplier.name}
                    {active.supplier.verified && <BadgeCheck size={12} className="text-primary-700" />}
                  </div>
                  <div className="text-[11px] text-gray-400">Usually responds within a few hours</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {active.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === 'me' ? 'bg-primary-800 text-white' : 'bg-white border border-gray-100 text-gray-700'
                    }`}>
                      <p className="leading-snug">{m.text}</p>
                      <span className={`block text-[10px] mt-1 ${m.from === 'me' ? 'text-primary-200' : 'text-gray-400'}`}>{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 px-4 py-2.5 text-sm bg-gray-50 rounded-full outline-none focus:ring-2 focus:ring-primary-200"
                />
                <button type="submit" className="w-10 h-10 flex-shrink-0 bg-primary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
