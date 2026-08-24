/**
 * Bot trap.
 *
 * Hidden with CSS rather than `type="hidden"`, because scripted submitters fill
 * anything with a plausible name while real browsers never focus it. Kept out of
 * the accessibility tree and out of the tab order so nobody using a screen
 * reader or keyboard can reach it by accident.
 */
export default function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
    >
      <label htmlFor="website-url">Do not fill this in</label>
      <input
        id="website-url"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
