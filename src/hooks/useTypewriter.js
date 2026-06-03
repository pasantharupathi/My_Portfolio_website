import { useState, useEffect, useRef } from 'react'

/**
 * useTypewriter
 * A production-ready typewriter animation hook.
 *
 * @param {string[]} words         - Array of words to cycle through
 * @param {object}   options
 * @param {number}   options.typeSpeed    - Ms per character when typing   (default: 95)
 * @param {number}   options.deleteSpeed  - Ms per character when deleting (default: 45)
 * @param {number}   options.pauseAfter   - Ms to pause after full word is typed (default: 1800)
 * @param {number}   options.pauseBefore  - Ms to pause before starting to delete (default: 0)
 *
 * @returns {string} The currently displayed text
 */
export function useTypewriter(words, {
  typeSpeed   = 95,
  deleteSpeed = 45,
  pauseAfter  = 1800,
  pauseBefore = 0,
} = {}) {
  // Store the visible text
  const [displayed, setDisplayed] = useState('')

  // Use refs so the effect closure always reads the latest values
  // without needing them as dependencies (avoids infinite re-scheduling)
  const wordIdxRef    = useRef(0)
  const isDeletingRef = useRef(false)
  const displayedRef  = useRef('')

  // Keep displayedRef in sync with state on every render
  displayedRef.current = displayed

  useEffect(() => {
    // Guard: nothing to do if the array is empty
    if (!words || words.length === 0) return

    let timerId = null   // single timer reference — always cleaned up

    function tick() {
      const currentWord = words[wordIdxRef.current]
      const currentText = displayedRef.current

      if (!isDeletingRef.current) {
        // ── TYPING phase ──────────────────────────────────────────────
        const next = currentWord.slice(0, currentText.length + 1)
        setDisplayed(next)

        if (next === currentWord) {
          // Finished typing → pause, then switch to deleting
          isDeletingRef.current = true
          timerId = setTimeout(tick, pauseAfter)
        } else {
          timerId = setTimeout(tick, typeSpeed)
        }

      } else {
        // ── DELETING phase ────────────────────────────────────────────
        const next = currentText.slice(0, -1)
        setDisplayed(next)

        if (next === '') {
          // Finished deleting → advance to next word, switch to typing
          isDeletingRef.current = false
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length
          timerId = setTimeout(tick, pauseBefore || typeSpeed)
        } else {
          timerId = setTimeout(tick, deleteSpeed)
        }
      }
    }

    // Kick off the first tick
    timerId = setTimeout(tick, typeSpeed)

    // Cleanup: cancel the pending timer when the component unmounts
    // or when the words / speed options change
    return () => clearTimeout(timerId)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, typeSpeed, deleteSpeed, pauseAfter, pauseBefore])
  //  ↑ Intentionally omitting `displayed` — we read it via ref to avoid
  //    scheduling a new effect on every single character update.

  return displayed
}
