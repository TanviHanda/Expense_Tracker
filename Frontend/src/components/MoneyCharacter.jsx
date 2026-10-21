import { useEffect, useState } from "react";

const scenes = ["income", "expense", "cry", "budget"];

const MoneyCharacter = () => {
  const [scene, setScene] = useState("income");

  useEffect(() => {
    const timer = setInterval(() => {
      setScene((current) => {
        const index = scenes.indexOf(current);
        return scenes[(index + 1) % scenes.length];
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`money-scene ${scene}`}>
      <div className="money-caption">
        {scene === "income" && "PAYDAY! Finally, I'm rich!"}
        {scene === "expense" && "WAIT... WHERE DID IT GO?!"}
        {scene === "cry" && "MY MONEY IS GONE!"}
        {scene === "budget" && "Okay. Time to get serious."}
      </div>

      <svg
        className="money-character"
        viewBox="0 0 240 280"
        role="img"
        aria-label={`Cartoon character: ${scene}`}
      >
        {/* FLOATING MONEY IN INCOME SCENE */}
        {scene === "income" && (
          <g className="floating-money">
            <path d="M22 65 L45 55 L40 73 L20 78 Z" fill="#22c55e" opacity="0.8" />
            <text x="27" y="72" fill="#14532d" fontSize="10" fontWeight="bold">₹</text>
            <path d="M190 85 L215 75 L210 93 L185 98 Z" fill="#22c55e" opacity="0.8" />
            <text x="195" y="92" fill="#14532d" fontSize="10" fontWeight="bold">₹</text>
            <circle cx="50" cy="45" r="3" fill="#fbbf24" />
            <circle cx="170" cy="50" r="3" fill="#60a5fa" />
            <circle cx="35" cy="110" r="2" fill="#f43f5e" />
          </g>
        )}

        {scene === "expense" && (
          <g className="stress-markers" stroke="#ef4444" strokeWidth="2" fill="none">
            <path d="M30 50 L40 40 M25 65 L15 63 M190 60 L205 50 M210 75 L225 78" />
          </g>
        )}

        {/* NECK */}
        <rect x="104" y="128" width="32" height="32" rx="10" fill="#d99570" stroke="#0f172a" strokeWidth="3" />

        {/* BODY & HOODIE */}
        <g className="character-body">
          <path
            d={
              scene === "budget"
                ? "M65 250 L75 175 Q80 148 120 148 Q160 148 165 175 L175 250 Z"
                : "M65 250 L75 177 Q80 150 120 150 Q160 150 165 177 L175 250 Z"
            }
            fill={scene === "budget" ? "#2563eb" : scene === "cry" ? "#334155" : "#172554"}
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Hoodie Drawstrings */}
          <path d="M110 150 Q108 172 104 180" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M130 150 Q132 172 136 179" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* ARMS & HANDS */}
        {scene === "income" ? (
          <g className="arms waving">
            <path d="M76 174 Q48 135 49 100" fill="none" stroke="#172554" strokeWidth="22" strokeLinecap="round" />
            <circle cx="49" cy="100" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M164 174 Q192 135 191 100" fill="none" stroke="#172554" strokeWidth="22" strokeLinecap="round" />
            <circle cx="191" cy="100" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
          </g>
        ) : scene === "expense" ? (
          <g className="arms clutching">
            <path d="M76 174 Q48 160 49 135" fill="none" stroke="#172554" strokeWidth="22" strokeLinecap="round" />
            <circle cx="49" cy="135" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M164 174 Q192 160 191 135" fill="none" stroke="#172554" strokeWidth="22" strokeLinecap="round" />
            <circle cx="191" cy="135" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
          </g>
        ) : scene === "cry" ? (
          <g className="arms dropped">
            <path d="M76 174 Q48 190 49 215" fill="none" stroke="#334155" strokeWidth="22" strokeLinecap="round" />
            <circle cx="49" cy="215" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
            
            <path d="M164 174 Q192 190 191 215" fill="none" stroke="#334155" strokeWidth="22" strokeLinecap="round" />
            <circle cx="191" cy="215" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />

            <path d="M192 242 L206 239 L202 248 L188 251 Z" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
          </g>
        ) : (
          <g className="arms analyzing">
            <path d="M76 174 Q48 190 49 215" fill="none" stroke="#2563eb" strokeWidth="22" strokeLinecap="round" />
            <circle cx="49" cy="215" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
            
            <path d="M164 174 Q192 190 191 215" fill="none" stroke="#2563eb" strokeWidth="22" strokeLinecap="round" />
            <circle cx="191" cy="215" r="12" fill="#d99570" stroke="#0f172a" strokeWidth="2.5" />
          </g>
        )}

        {/* HEAD */}
        <g className="character-head">
          <ellipse cx="120" cy="105" rx="48" ry="53" fill="#e8ad83" stroke="#0f172a" strokeWidth="3" />

          {/* Hair */}
          <path
            d="M74 103 Q61 70 85 55 L80 43 L101 52 Q117 27 133 48 L151 40 L148 57 Q175 65 167 101 L156 81 Q133 85 118 70 Q100 89 79 84 Z"
            fill="#27202b"
            stroke="#17131b"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* EYEBROWS */}
          {scene === "budget" ? (
            <g stroke="#17131b" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M85 83 H107" />
              <path d="M133 83 H155" />
            </g>
          ) : scene === "cry" ? (
            /* FIXED: Sad/distressed slanting eyebrows (\ /) */
            <g stroke="#17131b" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M85 92 L101 84" />
              <path d="M155 92 L139 84" />
            </g>
          ) : scene === "expense" ? (
            <g stroke="#17131b" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M85 78 Q96 72 107 82" />
              <path d="M133 82 Q144 72 155 78" />
            </g>
          ) : (
            <g stroke="#17131b" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M85 80 Q96 70 107 78" />
              <path d="M133 78 Q144 70 155 80" />
            </g>
          )}

          {/* EYES */}
          {scene === "budget" ? (
            <g fill="none" stroke="#29212a" strokeWidth="3">
              <rect x="85" y="92" width="24" height="17" rx="5" />
              <rect x="131" y="92" width="24" height="17" rx="5" />
              <path d="M109 98 H131" />
            </g>
          ) : scene === "cry" ? (
            /* FIXED: Downward sad arched eyes (v v) instead of smiling arches (^ ^) */
            <g fill="none" stroke="#29212a" strokeWidth="4" strokeLinecap="round">
              <path d="M87 96 Q97 106 107 96" />
              <path d="M133 96 Q143 106 153 96" />
            </g>
          ) : scene === "expense" ? (
            <g fill="#fff" stroke="#29212a" strokeWidth="3">
              <ellipse cx="98" cy="99" rx="11" ry="15" />
              <ellipse cx="142" cy="99" rx="11" ry="15" />
              <circle cx="99" cy="101" r="5" fill="#29212a" />
              <circle cx="141" cy="101" r="5" fill="#29212a" />
            </g>
          ) : (
            <g fill="#fff" stroke="#29212a" strokeWidth="3">
              <ellipse cx="98" cy="99" rx="9" ry="11" />
              <ellipse cx="142" cy="99" rx="9" ry="11" />
              <circle cx="100" cy="101" r="4" fill="#29212a" />
              <circle cx="140" cy="101" r="4" fill="#29212a" />
            </g>
          )}

          {/* MOUTH */}
          {scene === "income" && (
            <path
              d="M100 124 Q120 145 140 124"
              fill="#7f1d1d"
              stroke="#7f1d1d"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {scene === "expense" && (
            <ellipse cx="120" cy="128" rx="9" ry="13" fill="#7f1d1d" />
          )}

          {scene === "cry" && (
            /* FIXED: Deep downturned, crying/sobbing frown */
            <path
              d="M102 144 Q120 128 138 144 Q134 132 120 132 Q106 132 102 144 Z"
              fill="#7f1d1d"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          )}

          {scene === "budget" && (
            <path
              d="M105 126 Q120 134 135 126"
              fill="none"
              stroke="#7f1d1d"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* INDIVIDUAL FALLING TEARDROPS */}
          {scene === "cry" && (
            <g className="tears" fill="#38bdf8" stroke="#0284c7" strokeWidth="1">
              <path d="M 91 106 Q 91 116 87 120 Q 83 116 83 112 Q 83 106 91 106 Z" className="teardrop drop-1" />
              <path d="M 89 128 Q 89 138 85 142 Q 81 138 81 134 Q 81 128 89 128 Z" className="teardrop drop-2" />

              <path d="M 149 106 Q 149 116 153 120 Q 157 116 157 112 Q 157 106 149 106 Z" className="teardrop drop-1" />
              <path d="M 151 128 Q 151 138 155 142 Q 159 138 159 134 Q 159 128 151 128 Z" className="teardrop drop-2" />
            </g>
          )}
        </g>

        {/* LEGS */}
        <path
          d="M91 247 L87 268 M149 247 L153 268"
          stroke="#334155"
          strokeWidth="17"
          strokeLinecap="round"
        />

        {/* SHOES */}
        <path
          d="M72 269 H94 M145 269 H168"
          stroke="#e2e8f0"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>

      {scene === "cry" && (
        <div className="comic-bubble text-red-500 font-bold border border-red-500/20">
          I worked for this money! 😭
        </div>
      )}
    </div>
  );
};

export default MoneyCharacter;