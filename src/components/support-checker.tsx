"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, MapPin, RotateCcw, Search, ShieldCheck } from "lucide-react";
import {
  checkerQuestions,
  getCheckerMatches,
  type CheckerQuestionId,
  type CheckerResult,
} from "@/lib/support-checker";
import {
  getDisplayLocation,
  getSupportSections,
  type SeniorSupportEntry,
} from "@/lib/support-data";
import { looksLikePostcode } from "@/lib/postcode";

type Answers = Partial<Record<CheckerQuestionId, string>>;

type LocationMatch = {
  entry: SeniorSupportEntry;
  source: "postcode" | "local";
};

export function SupportChecker({ entries }: { entries: SeniorSupportEntry[] }) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [locationMatch, setLocationMatch] = useState<LocationMatch | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);
  const isLocationStep = step === 0;
  const question = checkerQuestions[step - 1];
  const isResultsStep = step > checkerQuestions.length;
  const progress = Math.min(step + 1, checkerQuestions.length + 1);
  const matches = useMemo(() => getCheckerMatches(answers), [answers]);

  async function resolveLocation() {
    const value = location.trim();
    setLocationMessage("");
    setLocationMatch(null);

    if (!value) {
      setLocationMessage("You can still see general support suggestions. Add a postcode or town later for local links.");
      setStep(1);
      return;
    }

    if (looksLikePostcode(value)) {
      setIsResolvingLocation(true);
      try {
        const response = await fetch(`/api/postcode-lookup?postcode=${encodeURIComponent(value)}`);
        const data = await response.json();
        const entry = entries.find((item) => item.slug === data.slug);
        if (response.ok && entry) {
          setLocationMatch({ entry, source: "postcode" });
          setStep(1);
          return;
        }
        setLocationMessage(data.error || "We could not match that postcode. You can still continue with general guidance.");
        setStep(1);
      } catch {
        setLocationMessage("Postcode lookup is unavailable right now. You can still continue with general guidance.");
        setStep(1);
      } finally {
        setIsResolvingLocation(false);
      }
      return;
    }

    const normalized = value.toLowerCase();
    const entry = entries.find((item) => {
      const display = getDisplayLocation(item).toLowerCase();
      return display === normalized || display.includes(normalized) || item.name.toLowerCase().includes(normalized);
    });

    if (entry) {
      setLocationMatch({ entry, source: "local" });
    } else {
      setLocationMessage("We could not match that place yet. Your results will still show useful general support routes.");
    }
    setStep(1);
  }

  function selectAnswer(questionId: CheckerQuestionId, answerId: string) {
    setAnswers((current) => ({ ...current, [questionId]: answerId }));
  }

  function nextStep() {
    if (step < checkerQuestions.length) {
      setStep((current) => current + 1);
      return;
    }
    setStep(checkerQuestions.length + 1);
  }

  function resetChecker() {
    setStep(0);
    setLocation("");
    setAnswers({});
    setLocationMatch(null);
    setLocationMessage("");
  }

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,27,61,0.12)] ring-1 ring-slate-200">
        <div className="bg-[linear-gradient(90deg,#eaf8f6_0%,#fff_55%,#fff5df_100%)] px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#007c89]">Support checker</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy [font-family:Georgia,serif]">
                {isResultsStep ? "Support that may be worth checking" : "Answer 6 quick questions"}
              </h2>
            </div>
            <div className="min-w-56">
              <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                <span>Step {progress} of 6</span>
                <span>{Math.round((progress / 6) * 100)}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                <div className="h-full rounded-full bg-[#007c89]" style={{ width: `${Math.min((progress / 6) * 100, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {!isResultsStep && (
          <div className="p-5 sm:p-8">
            {isLocationStep ? (
              <div>
                <QuestionHeading title="Where do you live?" helper="Enter a postcode, town, city or council area. This helps us show local council links when we can." />
                <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[#f8fbfb] p-3 ring-1 ring-slate-200 sm:flex-row">
                  <label className="sr-only" htmlFor="checker-location">Postcode, town, city or council area</label>
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4 ring-1 ring-slate-200">
                    <MapPin aria-hidden="true" className="h-6 w-6 shrink-0 text-[#007c89]" />
                    <input
                      id="checker-location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Postcode, town, city or council area"
                      className="min-h-14 w-full bg-transparent text-lg text-slate-950 outline-none placeholder:text-slate-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={resolveLocation}
                    disabled={isResolvingLocation}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 text-lg font-bold text-white shadow-md hover:bg-[#006d77] disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900"
                  >
                    <Search aria-hidden="true" className="h-5 w-5" />
                    {isResolvingLocation ? "Checking" : "Continue"}
                  </button>
                </div>
                <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm font-bold text-[#007c89] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
                  Skip location for now
                </button>
              </div>
            ) : (
              <div>
                <QuestionHeading title={question.title} helper={question.helper} />
                <div className="mt-6 grid gap-4">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectAnswer(question.id, option.id)}
                        className={`flex min-h-24 items-start gap-4 rounded-2xl border p-5 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${selected ? "border-[#007c89] bg-[#eaf8f6]" : "border-slate-200 bg-white hover:border-teal-200 hover:bg-[#f8fbfb]"}`}
                      >
                        <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${selected ? "bg-[#007c89] text-white ring-[#007c89]" : "bg-white text-slate-400 ring-slate-300"}`}>
                          {selected && <CheckCircle2 aria-hidden="true" className="h-5 w-5" />}
                        </span>
                        <span>
                          <span className="block text-xl font-bold text-slate-950">{option.label}</span>
                          <span className="mt-2 block text-base leading-7 text-slate-700">{option.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 font-bold text-[#007c89] ring-1 ring-teal-100 hover:bg-[#eefcf8] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                Back
              </button>
              {!isLocationStep && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!answers[question.id]}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 font-bold text-white shadow-md hover:bg-[#006d77] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900"
                >
                  {step === checkerQuestions.length ? "See results" : "Next question"}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {isResultsStep && (
          <CheckerResults
            matches={matches}
            locationMatch={locationMatch}
            locationMessage={locationMessage}
            onReset={resetChecker}
          />
        )}
      </div>
    </section>
  );
}

function QuestionHeading({ title, helper }: { title: string; helper: string }) {
  return (
    <div>
      <h3 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl [font-family:Georgia,serif]">{title}</h3>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">{helper}</p>
    </div>
  );
}

function CheckerResults({
  matches,
  locationMatch,
  locationMessage,
  onReset,
}: {
  matches: CheckerResult[];
  locationMatch: LocationMatch | null;
  locationMessage: string;
  onReset: () => void;
}) {
  const localSections = locationMatch ? getSupportSections(locationMatch.entry) : [];
  const localLinks = matches
    .flatMap((match) => localSections.find((section) => section.id === match.id)?.links.slice(0, 2) || [])
    .filter((link) => Boolean(link.href))
    .slice(0, 6);

  return (
    <div className="space-y-8 p-5 sm:p-8">
      <div className="rounded-2xl bg-[#fbf8e8] p-5 ring-1 ring-[#efe8bf]">
        <div className="flex gap-3">
          <ShieldCheck aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-[#2f7d46]" />
          <div>
            <h3 className="text-xl font-bold text-navy">A careful note before you apply</h3>
            <p className="mt-2 leading-7 text-slate-700">
              These results are signposts, not eligibility decisions. Official councils, GOV.UK, NHS services and charities decide current rules and applications.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-3xl font-extrabold text-navy [font-family:Georgia,serif]">Most relevant support</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {matches.map((match) => (
            <ResultCard key={match.id} result={match} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[#eaf8f6] p-5 ring-1 ring-teal-100">
        <h3 className="text-2xl font-bold text-navy">Local links near you</h3>
        {locationMatch ? (
          <>
            <p className="mt-2 leading-7 text-slate-700">
              We matched your search to <strong>{getDisplayLocation(locationMatch.entry)}</strong>. These official links may be useful next steps.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {localLinks.map((link) => (
                <a
                  key={`${link.name}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 hover:ring-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-bold text-slate-950">{link.name}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-700">{link.description}</span>
                    </span>
                    <ExternalLink aria-hidden="true" className="h-5 w-5 shrink-0 text-[#007c89]" />
                  </span>
                </a>
              ))}
            </div>
            <Link href={`/locations/${locationMatch.entry.slug}`} className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-5 py-3 font-bold text-white hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900">
              View all local support
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </>
        ) : (
          <>
            <p className="mt-2 leading-7 text-slate-700">
              {locationMessage || "Add a postcode, town or council area to see local council and charity links."}
            </p>
            <Link href="/locations" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-5 py-3 font-bold text-white hover:bg-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900">
              Search by location
              <Search aria-hidden="true" className="h-5 w-5" />
            </Link>
          </>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-bold text-navy">Useful guides</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {matches.slice(0, 4).map((match) => (
            <Link key={match.guideHref} href={match.guideHref} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-4 font-bold text-[#007c89] shadow-sm ring-1 ring-teal-100 hover:bg-[#eefcf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
              {match.guideLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 font-bold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
      >
        <RotateCcw aria-hidden="true" className="h-5 w-5" />
        Start again
      </button>
    </div>
  );
}

function ResultCard({ result }: { result: CheckerResult }) {
  const styles = {
    green: "bg-[#f1faee] text-[#2f7d46] ring-[#b9deb6]",
    teal: "bg-[#effcff] text-[#007c89] ring-[#b7dfe4]",
    blue: "bg-[#f2f6ff] text-[#155fa0] ring-[#bfd0f2]",
    orange: "bg-[#fff5ec] text-[#c95100] ring-[#f3c5a2]",
    red: "bg-[#fff1ec] text-[#c95100] ring-[#f2bda8]",
  }[result.color];
  const Icon = result.icon;
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${styles}`}>
        <Icon aria-hidden="true" className="h-8 w-8" />
      </div>
      <h4 className="mt-4 text-2xl font-bold text-navy">{result.title}</h4>
      <p className="mt-2 leading-7 text-slate-700">{result.summary}</p>
      <Link href={result.href} className="mt-4 inline-flex items-center gap-2 font-bold text-[#007c89] hover:text-[#006d77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        Browse this support
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  );
}
