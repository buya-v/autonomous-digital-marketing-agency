import React from 'react';
import { MarketingAsset } from '../../types';
import { Facebook, Linkedin, Chrome, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CreativeCardProps {
  asset: MarketingAsset;
}

export const CreativeCard: React.FC<CreativeCardProps> = ({ asset }) => {
  const getIcon = () => {
    switch (asset.platform) {
      case 'meta': return <Facebook className="w-4 h-4 text-[#1877F2]" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
      case 'google': return <Chrome className="w-4 h-4 text-[#EA4335]" />;
    }
  };

  return (
    <div className="group relative bg-bg-surface border border-slate-700/50 rounded-xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300">
      {/* Header */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <span className="bg-bg-main/90 backdrop-blur text-xs font-medium px-2 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 text-slate-200">
          {getIcon()}
          {asset.platform.charAt(0).toUpperCase() + asset.platform.slice(1)}
        </span>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-md border backdrop-blur flex items-center gap-1.5",
          asset.status === 'live' 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
        )}>
          {asset.status === 'live' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {asset.status.toUpperCase()}
        </span>
      </div>

      {/* Content Preview */}
      <div className="aspect-[4/3] w-full bg-slate-900 relative overflow-hidden">
        {asset.type === 'image' && asset.content_url ? (
          <img 
            src={asset.content_url} 
            alt="Ad Creative" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-800 to-slate-900">
             <p className="text-slate-300 font-medium text-center text-lg leading-relaxed italic">
               "{asset.preview_text}"
             </p>
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Edit
          </button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-primary/90 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="p-4 border-t border-slate-700/50 bg-bg-surface">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">AI Performance Score</span>
          <div className="flex items-center gap-2">
             <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
               <div 
                 className={cn("h-full rounded-full", asset.performance_score > 80 ? "bg-emerald-500" : "bg-amber-500")}
                 style={{ width: `${asset.performance_score}%` }}
               />
             </div>
             <span className="text-sm font-bold text-white">{asset.performance_score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
