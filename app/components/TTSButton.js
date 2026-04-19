'use client';
import { useState, useEffect } from 'react';

export default function TTSButton({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    
    // Just poke the API to trigger Chrome's async load behind the scenes.
    window.speechSynthesis.getVoices();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stripMarkdown = (md) => {
    if (!md) return '';
    return md
      .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
      .replace(/(\*|_)(.*?)\1/g, '$2')    // italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
      .replace(/#+\s?/g, '')              // headers
      .replace(/!\[(.*?)\]\(.*?\)/g, '')  // images
      .trim();
  };

  const handlePlay = () => {
    if (!window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (isPlaying) return;

    const cleanText = stripMarkdown(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Explicitly force the language to Arabic - Saudi Arabia
    utterance.lang = 'ar-SA';
    
    // Find the voice synchronously directly within the click handler
    const currentVoices = window.speechSynthesis.getVoices();
    const arabicVoice = currentVoices.find(voice => voice.lang.includes('ar') || voice.name.toLowerCase().includes('arabic'));
    
    console.log('Selected Voice:', arabicVoice);

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    } else {
      alert('Arabic voice not supported on this browser.');
    }

    utterance.rate = 0.9; // Slightly slower for better clarity

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    // Cancel any stuck speech in the queue (Chrome bug workaround)
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (window.speechSynthesis && isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!supported) return null;

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', background: '#f8fafc', padding: '15px 20px', borderRadius: '12px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      <span style={{ fontSize: '1.5rem' }}>🎧</span>
      <div style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>استمع للمقال</span>
        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Listen to the article</span>
      </div>
      
      {!isPlaying && !isPaused && (
        <button onClick={handlePlay} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          ▶️ تشغيل (Play)
        </button>
      )}
      
      {isPaused && (
        <button onClick={handlePlay} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          ▶️ استئناف (Resume)
        </button>
      )}

      {isPlaying && (
        <button onClick={handlePause} className="btn" style={{ padding: '0.5rem 1rem', background: '#eab308', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          ⏸️ إيقاف مؤقت (Pause)
        </button>
      )}

      {(isPlaying || isPaused) && (
        <button onClick={handleStop} className="btn" style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          ⏹️ إيقاف (Stop)
        </button>
      )}
    </div>
  );
}
