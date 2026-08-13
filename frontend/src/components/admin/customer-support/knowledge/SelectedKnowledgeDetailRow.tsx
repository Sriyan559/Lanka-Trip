'use client';

import React from 'react';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from 'lucide-react';
import {
  KnowledgeItem,
  LinkedPolicy,
  GroundingSource,
  ResponseTemplateItem,
  KnowledgeGapItem,
} from '@/types/knowledge';

interface SelectedKnowledgeDetailRowProps {
  item: KnowledgeItem;
  policies: LinkedPolicy[];
  sources: GroundingSource[];
  templates: ResponseTemplateItem[];
  gaps: KnowledgeGapItem[];
  onCopyReply?: () => void;
  onStartAction?: () => void;
  onViewBasis?: () => void;
  onOpenPlaybook?: () => void;
}

export function SelectedKnowledgeDetailRow({
  item,
  policies,
  sources,
  templates,
  gaps,
  onCopyReply,
  onStartAction,
  onViewBasis,
  onOpenPlaybook,
}: SelectedKnowledgeDetailRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.10fr)_minmax(0,1.85fr)_minmax(0,1.40fr)_minmax(0,1.15fr)_minmax(0,1.20fr)_minmax(0,1.20fr)_minmax(0,1.30fr)] gap-2 text-xs items-start">
      {/* 1. At a Glance */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">At a Glance</h4>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-400">KB ID</span> <strong className="text-slate-800 font-mono">{item.kbId}</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Created</span> <span className="text-slate-700">{item.createdAt}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Last Reviewed</span> <span className="text-slate-700">{item.lastReviewed}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Author</span> <strong className="text-slate-800">{item.author}</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Owner</span> <span className="text-slate-700">{item.owner}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Review Cadence</span> <span className="text-slate-700">{item.reviewCadence}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Next Review</span> <span className="text-slate-700">{item.nextReview}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Usage (30d)</span> <strong className="text-slate-800">{item.usageCount.toLocaleString()} views</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Helpful Rate</span> <strong className="text-emerald-600">{item.helpfulRate}%</strong></div>

            <div className="pt-1 border-t border-slate-100 space-y-1">
              <div className="flex justify-between"><span className="text-slate-400">Classification</span> <span className="px-1 py-0.2 bg-emerald-50 text-emerald-800 rounded font-bold text-[9px]">{item.classification}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Audience</span> <span className="text-slate-700 font-medium">{item.audience}</span></div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-slate-400">Channel Fit</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <MessageSquare size={10} />
                  <Mail size={10} />
                  <Phone size={10} />
                  <Share2 size={10} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Agent Assistance */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Agent Assistance</h4>

          {/* Suggested Reply Box */}
          <div className="bg-slate-50 border border-slate-200 rounded p-1.5 space-y-1 text-[10px]">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Suggested Reply <span className="text-emerald-600 font-normal">(Confidence: {item.suggestedReplyConfidence || 96}%)</span></span>
            </div>
            <p className="text-slate-700 italic leading-relaxed whitespace-normal break-words">
              "{item.suggestedReply || "Thanks for reaching out! Your order is delayed due to carrier disruptions. It's now expected to arrive by [date]. You'll receive tracking updates via email. Let us know if you need anything else!"}"
            </p>
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={onCopyReply}
                className="px-2 py-0.5 bg-white border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 text-[10px]"
              >
                <Copy size={10} />
                Copy Reply
              </button>
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="mt-2 space-y-1 text-[10px]">
            <span className="font-bold text-slate-700 block">Recommended Next Steps</span>
            <div className="space-y-0.5 text-slate-700 font-medium">
              <div className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-600 shrink-0" /> Confirm customer order and address</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-600 shrink-0" /> Check tracking status</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={11} className="text-emerald-600 shrink-0" /> Provide updated ETA</div>
            </div>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onStartAction}
            className="px-2.5 py-1 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-[10px] shadow-2xs"
          >
            Start Recommended Action
          </button>
          <button
            type="button"
            onClick={onViewBasis}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 text-[10px]"
          >
            View Basis
          </button>
        </div>
      </div>

      {/* 3. Guided Resolution (Playbook) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Guided Resolution (Playbook)</h4>
          <div className="space-y-1.5 text-[10px]">
            <div><span className="text-slate-400">Playbook</span> <strong className="text-slate-800 block leading-tight">Delivery Delay – Update Customer</strong></div>
            <div className="flex justify-between"><span className="text-slate-400">Steps</span> <span className="font-semibold text-slate-800">6</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Avg Handle Time</span> <span className="font-semibold text-slate-800">12 mins</span></div>
            <div>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-slate-500">Success Rate</span>
                <span className="font-bold text-emerald-600">92%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <ol className="space-y-0.5 text-[10px] text-slate-700 pt-1 list-none">
              <li className="flex items-start gap-1"><span className="font-bold text-slate-400">1</span> Verify order &amp; address</li>
              <li className="flex items-start gap-1"><span className="font-bold text-slate-400">2</span> Check tracking status</li>
              <li className="flex items-start gap-1"><span className="font-bold text-slate-400">3</span> Confirm delay reason</li>
              <li className="flex items-start gap-1"><span className="font-bold text-slate-400">4</span> Communicate new ETA</li>
            </ol>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onOpenPlaybook}
            className="text-[10px] text-[#881337] font-bold hover:underline"
          >
            Open Playbook &gt;
          </button>
        </div>
      </div>

      {/* 4. Linked Policies & References */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Linked Policies &amp; References</h4>
          <div className="space-y-1.5 text-[10px]">
            {policies.map((p) => (
              <div key={p.id} className="leading-tight">
                <span className="font-semibold text-slate-800 block hover:text-blue-600 cursor-pointer">{p.title}</span>
                <span className="font-mono text-[9px] text-blue-600">{p.policyId}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View All ({policies.length + 2}) &gt;
          </button>
        </div>
      </div>

      {/* 5. Grounding Sources */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Grounding Sources</h4>
          <div className="space-y-1.5 text-[10px]">
            {sources.map((s) => (
              <div key={s.id} className="leading-tight">
                <span className="font-semibold text-slate-800 block">{s.name}</span>
                <span className="text-[9px] text-slate-400">{s.updatedAt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View All ({sources.length + 5}) &gt;
          </button>
        </div>
      </div>

      {/* 6. Response Templates */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">Response Templates</h4>
          <div className="space-y-1.5 text-[10px]">
            {templates.map((t) => (
              <div key={t.id} className="flex items-center justify-between leading-tight">
                <span className="font-semibold text-slate-800 block truncate">{t.title}</span>
                <span className="font-bold text-emerald-600 text-[9px] shrink-0 ml-1">{t.matchScore}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View All ({templates.length + 3}) &gt;
          </button>
        </div>
      </div>

      {/* 7. Knowledge Gaps & Recent Feedback */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-slate-900 text-xs">Knowledge Gaps</h4>
            <span className="text-[9px] font-bold text-rose-600">{gaps.length} open gaps</span>
          </div>

          <div className="space-y-1 text-[10px] mb-2">
            {gaps.map((g) => (
              <div key={g.id} className="flex items-center justify-between leading-tight">
                <span className="font-semibold text-slate-800 truncate">{g.topic}</span>
                <span className={`px-1 py-0.2 rounded font-bold text-[8px] ${g.impact === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                  Impact: {g.impact}
                </span>
              </div>
            ))}
            <button type="button" className="text-[9px] text-blue-600 font-semibold hover:underline pt-0.5 block">
              View All Gaps
            </button>
          </div>

          <div className="pt-1.5 border-t border-slate-100">
            <span className="font-bold text-slate-900 text-[10px] block mb-1">Recent Feedback (30d)</span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <ThumbsUp size={11} /> 156
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <MessageCircle size={11} /> 18
              </span>
              <span className="flex items-center gap-1 text-rose-600 font-bold">
                <ThumbsDown size={11} /> 6
              </span>
            </div>
          </div>
        </div>

        <div className="pt-1.5 mt-2 border-t border-slate-100">
          <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
            View All Feedback &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
