"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { episodesPage } from "@/content/episodes";
import { EpisodeArtwork } from "@/components/episodes/EpisodeArtwork";
import { PlayControl } from "@/components/episodes/PlayControl";
import { WaveformProgress } from "@/components/episodes/WaveformProgress";
import { NextIcon, PreviousIcon } from "@/components/ui/icons";
import { formatTimecode } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";
import { cn } from "@/lib/cn";

export type PlayerHandle = {
  toggle: () => void;
  play: () => void;
  pause: () => void;
};

type PinnedPlayerProps = {
  episode: Episode;
  autoPlay: boolean;
  canPrevious: boolean;
  canNext: boolean;
  onAutoPlayConsumed: () => void;
  onPlayingChange: (playing: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export const PinnedPlayer = forwardRef<PlayerHandle, PinnedPlayerProps>(
  function PinnedPlayer(
    {
      episode,
      autoPlay,
      canPrevious,
      canNext,
      onAutoPlayConsumed,
      onPlayingChange,
      onPrevious,
      onNext,
    },
    ref,
  ) {
    const copy = episodesPage.player;
    const audioRef = useRef<HTMLAudioElement>(null);
    const autoPlayRef = useRef(autoPlay);
    autoPlayRef.current = autoPlay;
    const onAutoPlayConsumedRef = useRef(onAutoPlayConsumed);
    onAutoPlayConsumedRef.current = onAutoPlayConsumed;
    const onPlayingChangeRef = useRef(onPlayingChange);
    onPlayingChangeRef.current = onPlayingChange;
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(episode.durationSeconds);
    const [toast, setToast] = useState<string | null>(null);

    function failPlayback() {
      setToast(episodesPage.player.pending);
      setIsPlaying(false);
      onPlayingChangeRef.current(false);
    }

    function play() {
      const node = audioRef.current;
      if (!node) {
        return;
      }
      void node.play().catch(failPlayback);
    }

    function pause() {
      audioRef.current?.pause();
    }

    function toggle() {
      if (isPlaying) {
        pause();
        return;
      }
      play();
    }

    useImperativeHandle(ref, () => ({
      play() {
        const node = audioRef.current;
        if (!node) {
          return;
        }
        void node.play().catch(failPlayback);
      },
      pause() {
        audioRef.current?.pause();
      },
      toggle() {
        const node = audioRef.current;
        if (!node) {
          return;
        }
        if (node.paused) {
          void node.play().catch(failPlayback);
          return;
        }
        node.pause();
      },
    }));

    useEffect(() => {
      const node = audioRef.current;
      if (!node) {
        return;
      }
      setCurrentTime(0);
      setDuration(episode.durationSeconds);
      node.currentTime = 0;
      if (autoPlayRef.current) {
        void node.play().catch(() => {
          setToast(episodesPage.player.pending);
          setIsPlaying(false);
          onPlayingChangeRef.current(false);
        });
        onAutoPlayConsumedRef.current();
        return;
      }
      node.pause();
      setIsPlaying(false);
      onPlayingChangeRef.current(false);
    }, [episode.id, episode.audioUrl, episode.durationSeconds]);

    useEffect(() => {
      if (!toast) {
        return undefined;
      }
      const timer = window.setTimeout(() => setToast(null), 4000);
      return () => window.clearTimeout(timer);
    }, [toast]);

    const total = duration > 0 ? duration : episode.durationSeconds;
    const elapsedLabel = formatTimecode(currentTime);
    const totalLabel = formatTimecode(total);
    const playLabel = `${isPlaying ? copy.pause : copy.play} ${episode.title}`;

    return (
      <aside
        aria-label="Now listening"
        className={cn(
          "tone-forest border-t border-gold/70 px-4 py-3",
          "sm:border sm:border-gold/40 sm:px-6 sm:py-6",
          "lg:px-7 lg:py-7",
        )}
      >
        <div className="flex items-center gap-4 sm:items-start lg:flex-col lg:items-stretch">
          <EpisodeArtwork
            src={episode.imageUrl}
            priority
            framed
            sizes="(min-width: 1024px) 220px, 120px"
            className="aspect-[4/5] w-11 shrink-0 sm:w-24 lg:mx-auto lg:w-full lg:max-w-[13.5rem]"
          />
          <div className="min-w-0 flex-1 lg:mt-6">
            <p className="hidden text-[0.6875rem] font-semibold tracking-[0.18em] text-cream/60 uppercase sm:block">
              {copy.publisher}
            </p>
            <h2 className="truncate font-display text-lg leading-snug text-cream sm:mt-2 sm:text-2xl sm:whitespace-normal">
              {episode.title}
            </h2>
            <p className="mt-1 hidden text-sm text-cream/70 sm:block">
              {copy.ministry}
            </p>
            <div className="mt-3 sm:mt-5">
              <WaveformProgress
                value={currentTime}
                max={total}
                label={copy.progress}
                valueText={`${elapsedLabel} of ${totalLabel}`}
                onSeek={(seconds) => {
                  const node = audioRef.current;
                  if (!node) {
                    return;
                  }
                  node.currentTime = seconds;
                  setCurrentTime(seconds);
                }}
                invert
              />
              <div className="mt-1.5 flex justify-between text-[0.6875rem] font-semibold tracking-[0.12em] text-cream/70 tabular-nums uppercase">
                <span>{elapsedLabel}</span>
                <span>{totalLabel}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-3 sm:mt-5 sm:justify-center">
              <button
                type="button"
                aria-label={copy.previous}
                disabled={!canPrevious}
                onClick={onPrevious}
                className="inline-flex h-11 w-11 items-center justify-center text-cream disabled:opacity-35"
              >
                <PreviousIcon />
              </button>
              <PlayControl
                playing={isPlaying}
                filled={isPlaying}
                tone="forest"
                label={playLabel}
                onClick={toggle}
              />
              <button
                type="button"
                aria-label={copy.next}
                disabled={!canNext}
                onClick={onNext}
                className="inline-flex h-11 w-11 items-center justify-center text-cream disabled:opacity-35"
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
        {toast ? (
          <p
            role="status"
            aria-live="polite"
            className="mt-3 border border-gold/50 bg-cream px-3 py-2 text-sm text-forest"
          >
            {toast}
          </p>
        ) : null}
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          preload="metadata"
          aria-hidden="true"
          className="hidden"
          onPlay={() => {
            setIsPlaying(true);
            setToast(null);
            onPlayingChangeRef.current(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            onPlayingChangeRef.current(false);
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onDurationChange={(event) => {
            const next = event.currentTarget.duration;
            if (Number.isFinite(next) && next > 0) {
              setDuration(next);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
            onPlayingChangeRef.current(false);
          }}
          onError={failPlayback}
        />
      </aside>
    );
  },
);
