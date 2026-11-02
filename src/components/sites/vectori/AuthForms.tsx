"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { PixButton } from "./PixButton";
import { actions } from "./store";

/*
 * Login / sign-up / password reset / emailed-code screens. The source talks to its
 * auth API; here every flow signs in locally (localStorage) so the account area works.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EyeIcon = ({ off }: { off: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </svg>
);

function Field({ label, type = "text", value, onChange, name }: { label: string; type?: string; value: string; onChange: (v: string) => void; name: string }) {
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  return (
    <label className="px-field">
      <input
        name={name}
        type={isPassword && shown ? "text" : type}
        placeholder={label}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={isPassword ? "current-password" : name}
      />
      {isPassword && (
        <button type="button" className="px-field__toggle" aria-label={shown ? "hide the password" : "display the password"} onClick={() => setShown((s) => !s)}>
          <EyeIcon off={shown} />
        </button>
      )}
    </label>
  );
}

function AuthCard({ title, children, onSubmit }: { title: string; children: ReactNode; onSubmit: (e: FormEvent) => void }) {
  return (
    <form className="px-auth" onSubmit={onSubmit} noValidate>
      <p className="px-auth__title">{title}</p>
      {children}
    </form>
  );
}

/** Second step of the "email me a code" flows. Any 6-digit code is accepted locally. */
function CodeStep({ email, onDone, onBack }: { email: string; onDone: () => void; onBack: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  return (
    <AuthCard
      title="check your email"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(code)) return setError("enter the 6-digit code");
        onDone();
      }}
    >
      <p className="px-auth__lead">we sent a sign-in code to {email}</p>
      <p className="px-local-note">local demo: no email is sent — enter any 6 digits.</p>
      <Field label="6-digit code" name="one-time-code" value={code} onChange={setCode} />
      {error && <p className="px-auth__error">{error}</p>}
      <PixButton variant="grey" size="lg" type="submit">
        sign in
      </PixButton>
      <p className="px-auth__alt" role="button" tabIndex={0} onClick={onBack} onKeyDown={(e) => e.key === "Enter" && onBack()}>
        use a different email
      </p>
    </AuthCard>
  );
}

export function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/profile/information";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [codeFor, setCodeFor] = useState<string | null>(null);

  const finish = (address: string) => {
    actions.signIn(address);
    router.push(next);
  };

  if (codeFor) return <CodeStep email={codeFor} onDone={() => finish(codeFor)} onBack={() => setCodeFor(null)} />;

  return (
    <AuthCard
      title="login"
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) return setError("please enter a valid email address");
        if (password.length < 6) return setError("password must be at least 6 characters");
        finish(email);
      }}
    >
      <Field label="Email address" name="email" value={email} onChange={setEmail} />
      <Field label="Password" name="password" type="password" value={password} onChange={setPassword} />
      {error && <p className="px-auth__error">{error}</p>}
      <Link className="px-auth__link" href="/reset-password">
        forgot your password?
      </Link>
      <div>
        <PixButton variant="grey" size="lg" type="submit">
          login
        </PixButton>
      </div>
      <p
        className="px-auth__alt"
        role="button"
        tabIndex={0}
        onClick={() => (EMAIL_RE.test(email) ? setCodeFor(email) : setError("enter your email to receive a code"))}
        onKeyDown={(e) => e.key === "Enter" && (EMAIL_RE.test(email) ? setCodeFor(email) : setError("enter your email to receive a code"))}
      >
        email me a sign-in code instead
      </p>
      <p className="px-auth__foot">
        don’t have an account? <Link href="/sign-up">sign up</Link>
      </p>
    </AuthCard>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [codeFor, setCodeFor] = useState<string | null>(null);

  const finish = (address: string) => {
    actions.signIn(address);
    router.push("/profile/information");
  };

  if (codeFor) return <CodeStep email={codeFor} onDone={() => finish(codeFor)} onBack={() => setCodeFor(null)} />;

  return (
    <AuthCard
      title="create an account"
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) return setError("please enter a valid email address");
        if (password.length < 6) return setError("password must be at least 6 characters");
        finish(email);
      }}
    >
      <Field label="Email address" name="email" value={email} onChange={setEmail} />
      <Field label="Password" name="password" type="password" value={password} onChange={setPassword} />
      {error && <p className="px-auth__error">{error}</p>}
      <p className="px-auth__foot px-auth__foot--terms">
        by signing up you agree to Vectori’s <Link href="/help/terms-and-conditions">terms of service</Link>
      </p>
      <div>
        <PixButton variant="grey" size="lg" type="submit">
          sign up
        </PixButton>
      </div>
      <p
        className="px-auth__alt"
        role="button"
        tabIndex={0}
        onClick={() => (EMAIL_RE.test(email) ? setCodeFor(email) : setError("enter your email to receive a code"))}
        onKeyDown={(e) => e.key === "Enter" && (EMAIL_RE.test(email) ? setCodeFor(email) : setError("enter your email to receive a code"))}
      >
        sign up with an emailed code instead
      </p>
      <p className="px-auth__foot">
        already have an account? <Link href="/login">login</Link>
      </p>
    </AuthCard>
  );
}

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthCard
      title="reset password"
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email)) return setError("please enter a valid email address");
        setSent(true);
      }}
    >
      {sent ? (
        <>
          <p className="px-auth__success">if an account exists for {email}, we’ve sent a link to reset your password.</p>
          <p className="px-local-note">local demo: no email is sent. you can continue to the new-password step below.</p>
          <PixButton variant="grey" size="lg" href="/forgot-password">
            choose a new password
          </PixButton>
        </>
      ) : (
        <>
          <Field label="Email address" name="email" value={email} onChange={setEmail} />
          {error && <p className="px-auth__error">{error}</p>}
          <Link className="px-auth__link" href="/login">
            back to login
          </Link>
          <div>
            <PixButton variant="grey" size="lg" type="submit">
              submit
            </PixButton>
          </div>
        </>
      )}
    </AuthCard>
  );
}

export function NewPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  return (
    <AuthCard
      title="new password"
      onSubmit={(e) => {
        e.preventDefault();
        if (password.length < 6) return setError("password must be at least 6 characters");
        if (password !== confirm) return setError("passwords don’t match");
        router.push("/success-reset-password");
      }}
    >
      <Field label="New password" name="new-password" type="password" value={password} onChange={setPassword} />
      <Field label="Confirm password" name="confirm-password" type="password" value={confirm} onChange={setConfirm} />
      {error && <p className="px-auth__error">{error}</p>}
      <div className="px-auth__actions">
        <PixButton variant="grey" size="lg" type="submit">
          save password
        </PixButton>
      </div>
    </AuthCard>
  );
}

export function ResetSuccess() {
  return (
    <div className="px-auth">
      <p className="px-auth__title">password updated</p>
      <p className="px-auth__lead px-auth__lead--flush">
        your password has been changed. you can now log in with your new password.
      </p>
      <PixButton variant="grey" size="lg" href="/login">
        back to login
      </PixButton>
    </div>
  );
}

/** Magic-link landing page. The source validates a token; locally there is none, so it shows the expired state. */
export function MagicLinkExpired() {
  return (
    <div className="px-auth">
      <p className="px-auth__title">link expired</p>
      <p className="px-auth__lead px-auth__lead--flush">
        this sign-in link is invalid, expired or already used. request a new code to sign in.
      </p>
      <p className="px-auth__foot">
        back to <Link href="/login">login</Link>
      </p>
    </div>
  );
}
