import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Music2, 
  RotateCcw,
  Headphones
} from 'lucide-react';
import { PageTab } from '../types';

interface AudioTrack {
  id: string;
  title: string;
  arabicTitle: string;
  reciter: string;
  reciterTitle: string;
  audioUrl: string;
  tajweedRule: string;
  ruleExplanation: string;
  sampleAyahArabic: string;
  translation: string;
}

const TRACKS: AudioTrack[] = [
  {
    id: 'fatihah',
    title: 'Surah Al-Fatihah (The Opening)',
    arabicTitle: 'سُورَةُ الفَاتِحَة',
    reciter: 'Sheikh Mishary Rashid Alafasy',
    reciterTitle: 'World-Renowned Qari & Imam',
    audioUrl: 'https://cdn.mp3quran.net/audio/mishary-alafasy/r1/001.mp3',
    tajweedRule: 'Madd Asli & Makharij of Arabic Pharyngeal Letters (ح / ع)',
    ruleExplanation: 'Notice the elongated Madd in "الضَّالِّينَ" (6 Harakaat) and the deep, clean pronunciation of "الْحَمْدُ" and "نَسْتَعِينُ" from the middle of the throat.',
    sampleAyahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.'
  },
  {
    id: 'ikhlas',
    title: 'Surah Al-Ikhlas (Purity of Faith)',
    arabicTitle: 'سُورَةُ الإِخْلَاص',
    reciter: 'Sheikh Mahmoud Khalil Al-Husary',
    reciterTitle: 'Master of Classical Tajweed & Sanad',
    audioUrl: 'https://cdn.mp3quran.net/audio/mahmoud-husary/r1/112.mp3',
    tajweedRule: 'Qalqalah Kubra & Sughra on the Letter Daal (د)',
    ruleExplanation: 'Listen carefully to the resounding echoing bounce (Qalqalah) at the stop of each Ayah on the letter Daal: "أَحَدْ", "الصَّمَدْ", "يُولَدْ", and "أَحَدْ".',
    sampleAyahArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ • اللَّهُ الصَّمَدُ • لَمْ يَلِدْ وَلَمْ يُولَدْ',
    translation: 'Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born."'
  },
  {
    id: 'nas',
    title: 'Surah An-Nas (Mankind)',
    arabicTitle: 'سُورَةُ النَّاس',
    reciter: 'Sheikh Muhammad Siddiq Al-Minshawi',
    reciterTitle: 'Revered Master of Tartil & Soulful Recitation',
    audioUrl: 'https://cdn.mp3quran.net/audio/muhammad-minshawi/r1/114.mp3',
    tajweedRule: 'Ghunnah (Nasalization) on Noon Mushaddadah (نّ)',
    ruleExplanation: 'The 2-beat nasal resonance on the doubled Noon ("النَّاسِ", "الْجِنَّةِ") requires holding the sound in the nasal cavity with gentle sweetness.',
    sampleAyahArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ • مَلِكِ النَّاسِ • إِلَٰهِ النَّاسِ',
    translation: 'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind."'
  },
  {
    id: 'falaq',
    title: 'Surah Al-Falaq (The Daybreak)',
    arabicTitle: 'سُورَةُ الفَلَق',
    reciter: 'Sheikh Mishary Rashid Alafasy',
    reciterTitle: 'Clear Tartil for Beginners & Kids',
    audioUrl: 'https://cdn.mp3quran.net/audio/mishary-alafasy/r1/113.mp3',
    tajweedRule: 'Qalqalah on Qaaf (ق), Baa (ب), and Daal (د)',
    ruleExplanation: 'Distinguishing between the heavy letter Qaaf ("الْفَلَقْ") and light letter Baa ("وَقَبْ"), ensuring no vowel addition to the stopping Sukoon.',
    sampleAyahArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • مِن شَرِّ مَا خَلَقَ • وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
    translation: 'Say, "I seek refuge in the Lord of daybreak, From the evil of that which He created, And from the evil of darkness when it settles."'
  }
];

interface TajweedAudioShowcaseProps {
  setActiveTab: (tab: PageTab) => void;
}

export const TajweedAudioShowcase: React.FC<TajweedAudioShowcaseProps> = ({ setActiveTab }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[selectedTrackIndex];

  // Initialize or update track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      setCurrentTime(0);
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [selectedTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleTrackEnd}
        preload="metadata"
      />

      <div className="bg-gradient-to-br from-primary-dark via-primary to-secondary text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-accent/40 relative overflow-hidden">
        {/* Subtle Islamic pattern background */}
        <div className="absolute inset-0 bg-emerald-pattern opacity-10 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-accent/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5" />
              <span>Interactive Tajweed & Qirat Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Listen to the Art of <span className="gold-gradient-text">Tazyeen-ul-Quran</span>
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-2xl leading-relaxed">
              "Tazyeen" means beautifying the recitation of the Quran with accurate Tajweed rules. Experience the difference between ordinary reading and master-level Tartil.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-accent font-semibold hidden sm:inline">Recitation by World Qaris:</span>
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-accent/30 border-2 border-primary flex items-center justify-center text-xs font-bold text-accent">ح</span>
              <span className="w-8 h-8 rounded-full bg-accent/40 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">ع</span>
              <span className="w-8 h-8 rounded-full bg-accent/50 border-2 border-primary flex items-center justify-center text-xs font-bold text-accent">م</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Track Selector & Active Player */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Track Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent/80 block mb-1">
              Select Sample Surah & Lesson:
            </span>

            {TRACKS.map((track, idx) => {
              const isSelected = selectedTrackIndex === idx;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrackIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between gap-3 border ${
                    isSelected
                      ? 'bg-white/15 border-accent text-white shadow-lg backdrop-blur-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                      isSelected ? 'bg-accent text-primary-dark shadow-sm' : 'bg-primary-dark/80 text-accent/80 border border-accent/20'
                    }`}>
                      {isSelected && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-1 bg-primary-dark rounded-full animate-bounce h-2"></span>
                          <span className="w-1 bg-primary-dark rounded-full animate-bounce h-3 delay-75"></span>
                          <span className="w-1 bg-primary-dark rounded-full animate-bounce h-1.5 delay-150"></span>
                        </div>
                      ) : (
                        <span>0{idx + 1}</span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold leading-tight font-serif">
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-accent/90 mt-0.5">
                        {track.reciter}
                      </p>
                    </div>
                  </div>

                  <span className="font-serif text-sm text-accent shrink-0 font-medium hidden sm:inline">
                    {track.arabicTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Player Box */}
          <div className="lg:col-span-7 bg-secondary-dark/95 border border-accent/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Top of Player: Title & Arabic Calligraphy */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 inline-block mb-1.5">
                  Now Playing Demo
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-accent mt-0.5">
                  Recited by {currentTrack.reciter} ({currentTrack.reciterTitle})
                </p>
              </div>

              <div className="text-right">
                <span className="font-serif text-2xl sm:text-3xl text-accent-light block font-semibold">
                  {currentTrack.arabicTitle}
                </span>
              </div>
            </div>

            {/* Arabic Sample Ayah Box */}
            <div className="bg-primary-dark/80 p-4 rounded-2xl border border-accent/30 text-center space-y-2">
              <p className="font-serif text-lg sm:text-xl text-accent font-semibold leading-relaxed tracking-wide">
                {currentTrack.sampleAyahArabic}
              </p>
              <p className="text-xs text-ivory/70 italic max-w-lg mx-auto">
                "{currentTrack.translation}"
              </p>
            </div>

            {/* Progress Bar & Timers */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-ivory/60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-4 pt-2">
              
              {/* Play / Pause Primary Action */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-accent via-accent-light to-accent text-primary-dark flex items-center justify-center shadow-xl hover:shadow-gold hover:scale-105 active:scale-95 transition-all"
                  title={isPlaying ? 'Pause' : 'Play Recitation'}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6 fill-primary-dark" />
                  ) : (
                    <Play className="w-6 h-6 fill-primary-dark ml-0.5" />
                  )}
                </button>

                <div>
                  <span className="text-xs font-bold text-white block">
                    {isPlaying ? 'Playing Recitation' : 'Click to Listen'}
                  </span>
                  <span className="text-[10px] text-ivory/60">
                    High Quality Audio Stream
                  </span>
                </div>
              </div>

              {/* Volume & Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-ivory/80 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-ivory/80 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-accent" />}
                </button>
              </div>

            </div>

            {/* Tajweed Educational Explanation Card */}
            <div className="bg-primary/90 p-4 rounded-2xl border border-accent/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-accent font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Tajweed Focus Rule: {currentTrack.tajweedRule}</span>
              </div>
              <p className="text-ivory/90 leading-relaxed text-[11px] sm:text-xs">
                {currentTrack.ruleExplanation}
              </p>
            </div>

            {/* CTA directly to Trial with Tajweed pre-selected */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-accent/20">
              <span className="text-xs text-ivory/80 text-center sm:text-left">
                Want to recite with this exact beauty and precision?
              </span>

              <button
                onClick={() => setActiveTab('trial')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-light text-primary-dark font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book 1-on-1 Tajweed Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
