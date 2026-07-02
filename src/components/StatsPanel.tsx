import React from 'react';

interface StatsPanelProps {
  cpuRunning: boolean;
  gpuRunning: boolean;
  cpuIntensity: number;
  fps: number;
  elapsedTime: number;
  sequencePaused: boolean;
  stepRemainingTime: number | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  cpuRunning,
  gpuRunning,
  cpuIntensity,
  fps,
  elapsedTime,
  sequencePaused,
  stepRemainingTime
}) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', rowGap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8em', opacity: 0.6 }}>ACTIVE THREADS</div>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{cpuRunning ? Math.round(cpuIntensity) : 0}</div>
      </div>
      <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8em', opacity: 0.6 }}>FPS</div>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
          {fps}
        </div>
      </div>
      <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8em', opacity: 0.6 }}>STEP REMAINING</div>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums', color: 'white' }}>
          {stepRemainingTime !== null ? formatTime(stepRemainingTime) : '∞'}
        </div>
      </div>
      <div style={{ gridColumn: 'span 3', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8em', opacity: 0.6 }}>STATUS</div>
        <div 
          className={(cpuRunning || gpuRunning) ? "gradient-text" : ""}
          style={{ fontSize: '1.5em', fontWeight: 'bold', color: (cpuRunning || gpuRunning) ? 'inherit' : sequencePaused ? '#60a5fa' : 'white' }}
        >
          {cpuRunning || gpuRunning ? 'TESTING' : sequencePaused ? 'COOLDOWN' : 'IDLE'}
        </div>
      </div>
      <div style={{ gridColumn: 'span 3', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8em', opacity: 0.6 }}>ELAPSED TIME</div>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(elapsedTime)}
        </div>
      </div>
    </div>
  );
};
