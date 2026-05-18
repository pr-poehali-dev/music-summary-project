import { useState, useEffect, useRef } from "react";

const TRACKS = {
  slide1bg: "https://files.catbox.moe/naivim.mp3",
  slide2: "https://files.catbox.moe/ceikb4.mp3",
  slide3: "https://files.catbox.moe/dhkehr.mp3",
  slide4: "https://files.catbox.moe/1tva1n.mp3",
  slide5: "https://files.catbox.moe/xrjmo0.mp3",
};

const EUROVISION_LETTERS = ["E", "U", "R", "O", "V", "I", "S", "I", "O", "N"];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

export default function Index() {
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [song1Active, setSong1Active] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const mainAudioRef = useRef<HTMLAudioElement | null>(null);

  const targetDate = new Date("2026-06-27T17:30:00");
  const countdown = useCountdown(targetDate);

  const stopAll = () => {
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      mainAudioRef.current.currentTime = 0;
    }
  };

  const playTrack = (url: string, loop = false) => {
    stopAll();
    const audio = new Audio(url);
    audio.loop = loop;
    audio.volume = 0.8;
    audio.play().catch(() => {});
    mainAudioRef.current = audio;
  };

  const goTo = (next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setSlide(next);
      setTransitioning(false);
    }, 700);
  };

  const handlePlaySong1 = () => {
    setSong1Active(true);
    playTrack(TRACKS.slide1bg, true);
    setTimeout(() => setShowNextBtn(true), 900);
  };

  const goSlide2 = () => {
    stopAll();
    goTo(1);
    setTimeout(() => playTrack(TRACKS.slide2, false), 700);
  };

  const goSlide3 = () => {
    stopAll();
    goTo(2);
    setTimeout(() => playTrack(TRACKS.slide3, false), 700);
  };

  const goSlide4 = () => {
    stopAll();
    goTo(3);
    setTimeout(() => playTrack(TRACKS.slide4, false), 700);
  };

  const goSlide5 = () => {
    stopAll();
    goTo(4);
    setTimeout(() => playTrack(TRACKS.slide5, false), 700);
  };

  useEffect(() => {
    return () => stopAll();
  }, []);

  return (
    <div className="spotira-root">
      {/* Floating EUROVISION letters */}
      <div className="euro-bg" aria-hidden="true">
        {EUROVISION_LETTERS.map((l, i) => (
          <span key={i} className="euro-letter" style={{ "--i": i } as React.CSSProperties}>{l}</span>
        ))}
        <span className="euro-year">2026</span>
      </div>

      {/* === SLIDE 1 === */}
      <div className={`slide ${slide === 0 ? "active" : "hidden-slide"} ${transitioning ? "transitioning" : ""}`}>
        <div className="slide-inner">
          <div className="spotira-logo">
            <span className="logo-spot">spot</span><span className="logo-ira">IRA</span>
          </div>
          <div className="slide1-subtitle">не просто музыкальные итоги</div>
          <div className="slide1-title">а приглашение отметить мои 30</div>
          <div className="slide1-hello">Привет, Сашко — это для тебя 💛</div>

          <div className="countdown-block">
            <div className="countdown-label">до 27 июня</div>
            <div className="countdown-units">
              <div className="countdown-unit">
                <span className="countdown-num">{countdown.days}</span>
                <span className="countdown-sub">дней</span>
              </div>
              <div className="countdown-dot">:</div>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.hours).padStart(2, "0")}</span>
                <span className="countdown-sub">часов</span>
              </div>
              <div className="countdown-dot">:</div>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.minutes).padStart(2, "0")}</span>
                <span className="countdown-sub">минут</span>
              </div>
              <div className="countdown-dot">:</div>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.seconds).padStart(2, "0")}</span>
                <span className="countdown-sub">секунд</span>
              </div>
            </div>
          </div>

          <div className="slide1-btns">
            {!song1Active ? (
              <button className="btn-main" onClick={handlePlaySong1}>
                ▶ Нажми сюда
              </button>
            ) : (
              <div className="now-playing">
                <div className="bars">
                  <span /><span /><span /><span /><span />
                </div>
                <span>играет...</span>
              </div>
            )}
            {showNextBtn && (
              <button className="btn-secondary btn-fadein" onClick={goSlide2}>
                Смотреть итоги →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* === SLIDE 2 === */}
      <div className={`slide ${slide === 1 ? "active" : "hidden-slide"} ${transitioning ? "transitioning" : ""}`}>
        <div className="slide-inner">
          <div className="slide2-track-tag">🎵 Трек, что связывает нас с тобой</div>
          <div className="vinyl-wrap">
            <div className="vinyl-disc">
              <div className="vinyl-center" />
            </div>
          </div>
          <p className="slide2-text">
            Если ты вдруг не знал, но ты самый лучший брат на свете — давай продолжать создавать моменты вместе
          </p>
          <button className="btn-main" onClick={goSlide3}>Далее →</button>
        </div>
      </div>

      {/* === SLIDE 3 === */}
      <div className={`slide ${slide === 2 ? "active" : "hidden-slide"} ${transitioning ? "transitioning" : ""}`}>
        <div className="circles-bg" aria-hidden="true">
          <div className="circle c1" /><div className="circle c2" /><div className="circle c3" />
          <div className="circle c4" /><div className="circle c5" />
        </div>
        <div className="slide-inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="slide3-tag">Момент с тобой</div>
          <p className="slide3-text">
            Помнишь, как мы каждую субботу бежали смотреть новые серии сериалов Disney? Или как ездили в Саратов на машине? И ещё миллион моментов, где мы смеялись как сумасшедшие?
          </p>
          <p className="slide3-thanks">Спасибо тебе за эти моменты</p>
          <button className="btn-main" onClick={goSlide4}>Что там дальше? →</button>
        </div>
      </div>

      {/* === SLIDE 4 === */}
      <div className={`slide ${slide === 3 ? "active" : "hidden-slide"} ${transitioning ? "transitioning" : ""}`}>
        <div className="slide-inner">
          <div className="slide4-tag">Статистика дружбы</div>
          <div className="stats-list">
            <div className="stat-item">
              <div className="stat-label">Сколько мы дружим</div>
              <div className="stat-value">9 856 <span className="stat-unit">дней</span></div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Сколько раз ты был(а) на моём дне рождения</div>
              <div className="stat-value stat-small">кажется, почти на всех</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Как сильно я дорожу тобой</div>
              <div className="stat-value stat-small">настолько, насколько это возможно в этой вселенной</div>
            </div>
          </div>
          <p className="slide4-footer">
            И далее я хочу разделить с тобой свои 30 лет и переход в новое десятилетие
          </p>
          <button className="btn-main" onClick={goSlide5}>Подробности →</button>
        </div>
      </div>

      {/* === SLIDE 5 === */}
      <div className={`slide ${slide === 4 ? "active" : "hidden-slide"} ${transitioning ? "transitioning" : ""}`}>
        <div className="stars-bg" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="star" style={{ "--si": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="slide-inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="slide5-crown">♛</div>
          <h2 className="slide5-title">Жду тебя!</h2>
          <div className="slide5-info">
            <div className="info-row">📅 <span>27 июня в 17:30</span></div>
            <div className="info-row">📍 <span>Московский проспект 139А, м Электросила<br /><small>(вход с торца через железную калитку)</small></span></div>
            <div className="info-row">📞 <span>Мой номер знаешь!</span></div>
            <div className="info-row">🎤 <span>Тематика: <strong>Eurovision</strong></span></div>
          </div>
          <div className="slide5-schedule">
            <div className="schedule-item"><span className="stime">17:30–18:30</span> Сбор, лёгкий перекус, первые тосты</div>
            <div className="schedule-item"><span className="stime">18:30–20:30</span> Вкусно кушаем, вкусно пьём и проходим квиз по Иришке</div>
            <div className="schedule-item"><span className="stime">20:30–22:00</span> Слушаем музыку, общаемся</div>
          </div>
          <a
            href="https://docs.google.com/document/d/19nD4DwoFk2GaUhR5G1j0_YAmeqTiTXoMtmebOjLU_JA/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-main btn-link"
          >
            <span className="euro-word">Eurovision</span> — нажми, чтобы узнать подробности
          </a>
          <a
            href="https://docs.google.com/spreadsheets/d/1Ku3rdanulnFMoDGRRYnycAnj4sJThtFrm7mCLC-oufE/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-link"
          >
            🎁 Wishlist
          </a>
        </div>
      </div>

      {/* Transition overlay */}
      <div className={`transition-overlay ${transitioning ? "show" : ""}`} />
    </div>
  );
}
