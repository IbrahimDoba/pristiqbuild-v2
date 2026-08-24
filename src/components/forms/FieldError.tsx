/**
 * Server-side validation message for one field.
 *
 * Renders below its input, per the project's form convention: label above,
 * input, error below.
 */
export default function FieldError({
  name,
  errors,
}: {
  name: string;
  errors: Record<string, string>;
}) {
  const message = errors[name];
  if (!message) return null;

  return (
    <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
      {message}
    </p>
  );
}
