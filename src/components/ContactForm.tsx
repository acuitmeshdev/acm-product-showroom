import { useState } from 'react';

interface Props {
  formspreeId?: string;
  productName: string;
  brandColor?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ formspreeId, productName, brandColor = '#6366f1' }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formspreeId || formspreeId === 'YOUR_FORMSPREE_ID') {
      setStatus('error');
      setErrorMsg('Contact form is not configured yet. Please set up a Formspree ID.');
      return;
    }
    setStatus('submitting');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const json = await res.json();
        setStatus('error');
        setErrorMsg(json?.errors?.[0]?.message ?? 'Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${brandColor}22` }}
        >
          <svg className="w-8 h-8" style={{ color: brandColor }} fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message sent!</h3>
        <p className="text-slate-600">Thanks for your interest in {productName}. We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
      <input type="hidden" name="_subject" value={`Enquiry about ${productName}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            Full name <span className="text-rose-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{ '--tw-ring-color': brandColor } as React.CSSProperties}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Work email <span className="text-rose-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{ '--tw-ring-color': brandColor } as React.CSSProperties}
          />
        </div>
      </div>

      <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Acme Inc."
          className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
          style={{ '--tw-ring-color': brandColor } as React.CSSProperties}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Message <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={`Tell us about your needs for ${productName}...`}
          className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
          style={{ '--tw-ring-color': brandColor } as React.CSSProperties}
        />
      </div>

      {status === 'error' && (
        <p className="text-rose-400 text-sm bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: brandColor }}
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Sending…
          </span>
        ) : (
          'Send Enquiry'
        )}
      </button>
    </form>
  );
}
