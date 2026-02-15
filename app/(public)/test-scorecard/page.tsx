'use client';

import { useState } from 'react';
import Image from 'next/image';

function RatingQuestion({
  name,
  label,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name={`${name}Rating`}
              value={value}
              required={required}
              className="sr-only peer"
            />
            <div className="border border-gray-300 rounded-md py-2 text-center peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-50 peer-checked:hover:bg-blue-600 transition-colors">
              <span className="text-sm font-medium">{value}</span>
            </div>
          </label>
        ))}
      </div>
      <input
        type="text"
        name={`${name}Remarks`}
        placeholder="Remarks (optional)"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default function TestScorecardPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      date: formData.get('date'),
      completionStatus: formData.get('completionStatus'),
      questionsUnderstanding: {
        rating: formData.get('questionsUnderstandingRating'),
        remarks: formData.get('questionsUnderstandingRemarks'),
      },
      agentResponse: {
        rating: formData.get('agentResponseRating'),
        remarks: formData.get('agentResponseRemarks'),
      },
      stuckOrConfused: {
        rating: formData.get('stuckOrConfusedRating'),
        remarks: formData.get('stuckOrConfusedRemarks'),
      },
      liked: formData.get('liked'),
      couldBeBetter: formData.get('couldBeBetter'),
      score: formData.get('score'),
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/test-scorecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <Image
            src="/taloo-logo.svg"
            alt="Taloo"
            width={120}
            height={40}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank you!
          </h1>
          <p className="text-gray-600">
            Your feedback has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Agent Test Scorecard
          </h1>
          <Image
            src="/taloo-logo.svg"
            alt="Taloo"
            width={100}
            height={32}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Your Info */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              Your Info
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              <strong>Goal:</strong> Apply for a vacancy
            </p>
          </section>

          {/* Completion */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              Did You Complete the Application?
            </h2>
            <div className="space-y-2">
              {[
                { value: 'yes', label: 'Yes, completely' },
                { value: 'partly', label: 'Partly, I got stuck' },
                { value: 'no', label: "No, it didn't work" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="completionStatus"
                    value={option.value}
                    required
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* The Conversation */}
          <section className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              The Conversation
            </h2>

            <RatingQuestion
              name="questionsUnderstanding"
              label="Were the questions easy to understand and answer?"
              required
            />

            <RatingQuestion
              name="agentResponse"
              label="Did the agent respond well to your answers? (good follow-up, felt natural)"
              required
            />

            <RatingQuestion
              name="stuckOrConfused"
              label="Did you feel stuck or confused at any point? If so, what happened?"
              required
            />
          </section>

          {/* Your Experience */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              Your Experience
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What did you like?
              </label>
              <textarea
                name="liked"
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What could be better?
              </label>
              <textarea
                name="couldBeBetter"
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </section>

          {/* Overall Score */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
              Overall Score
            </h2>
            <div className="flex items-center justify-between gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <label
                  key={score}
                  className="flex-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="score"
                    value={score}
                    required
                    className="sr-only peer"
                  />
                  <div className="border border-gray-300 rounded-md py-3 text-center peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-50 peer-checked:hover:bg-blue-600 transition-colors">
                    <span className="text-lg font-medium">{score}</span>
                    <span className="block text-xs mt-1">
                      {score === 1 && 'Very bad'}
                      {score === 2 && 'Bad'}
                      {score === 3 && 'Okay'}
                      {score === 4 && 'Good'}
                      {score === 5 && 'Very good'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Thank you for testing!
          </p>
        </form>
      </div>
    </div>
  );
}
