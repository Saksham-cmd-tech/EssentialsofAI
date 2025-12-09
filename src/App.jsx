import React, { useState, useEffect } from "react";
import {
  BookOpen,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Check,
  Moon,
  Sun,
  Filter,
  Search,
  SendToBack,
  ArrowLeft,
  MoveLeft,
  ArrowLeftCircle,
} from "lucide-react";
import data from "./ai_qa_json.json";

const qaData = data;

const App = () => {
  const [mode, setMode] = useState("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [questions, setQuestions] = useState(qaData.qaBank);
  const [masteredQuestions, setMasteredQuestions] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showOnlyUnmastered, setShowOnlyUnmastered] = useState(false);

  // Get all unique tags
  const allTags = ["all", ...new Set(qaData.qaBank.flatMap((q) => q.tags))];

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || q.tags.includes(selectedTag);
    const matchesMastered = !showOnlyUnmastered || !masteredQuestions.has(q.id);
    return matchesSearch && matchesTag && matchesMastered;
  });

  const currentQuestion = filteredQuestions[currentIndex];

  // Load and save dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const shuffleQuestions = () => {
    const shuffledArray = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledArray);
    setCurrentIndex(0);
    setShowAnswer(false);
    setShuffled(true);
  };

  const resetOrder = () => {
    setQuestions(qaData.qaBank);
    setCurrentIndex(0);
    setShowAnswer(false);
    setShuffled(false);
  };

  const nextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleMastered = (id) => {
    const newMastered = new Set(masteredQuestions);
    if (newMastered.has(id)) {
      newMastered.delete(id);
    } else {
      newMastered.add(id);
    }
    setMasteredQuestions(newMastered);
  };

  const renderMenu = () => (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } flex items-center justify-center p-4`}
    >
      <div className="fixed bottom-0 right-4 text-sm text-gray-500">
        Made By Saksham Jineshwar Tale
      </div>

      <div className="max-w-2xl w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-400"
                : "bg-white text-indigo-600"
            } shadow-lg hover:shadow-xl transition-all`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-center mb-12">
          <h1
            className={`text-5xl font-bold ${
              darkMode ? "text-white" : "text-indigo-900"
            } mb-3`}
          >
            AI Essentials
          </h1>
          <p
            className={`text-xl ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Semester III Study Tool
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } mt-2`}
          >
            {qaData.totalQuestions} Questions Available
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setMode("flashcard")}
            className={`${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 ${
              darkMode
                ? "hover:border-indigo-500"
                : "border-transparent hover:border-indigo-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  darkMode ? "bg-indigo-900" : "bg-indigo-100"
                } p-4 rounded-full mb-4`}
              >
                <BookOpen
                  className={`w-12 h-12 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                } mb-2`}
              >
                Flashcards
              </h2>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-center`}
              >
                Study with interactive flashcards. Click to reveal answers.
              </p>
            </div>
          </button>

          <button
            onClick={() => setMode("revision")}
            className={`${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 ${
              darkMode
                ? "hover:border-purple-500"
                : "border-transparent hover:border-indigo-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  darkMode ? "bg-purple-900" : "bg-purple-100"
                } p-4 rounded-full mb-4`}
              >
                <RefreshCw
                  className={`w-12 h-12 ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                } mb-2`}
              >
                Revision Mode
              </h2>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-center`}
              >
                Review all questions with answers. Track your progress.
              </p>
            </div>
          </button>
        </div>

        <div
          className={`mt-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-xl shadow-md`}
        >
          <h3
            className={`font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            } mb-3`}
          >
            Your Progress
          </h3>
          <div className="flex items-center justify-between">
            <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Mastered Questions:
            </span>
            <span
              className={`text-2xl font-bold ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              {masteredQuestions.size} / {qaData.totalQuestions}
            </span>
          </div>
          <div
            className={`mt-3 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded-full h-3 overflow-hidden`}
          >
            <div
              className={`${
                darkMode ? "bg-indigo-500" : "bg-indigo-600"
              } h-full transition-all duration-500`}
              style={{
                width: `${
                  (masteredQuestions.size / qaData.totalQuestions) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFlashcard = () => (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } p-4`}
    >
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setMode("menu")}
            className={`px-4 py-2 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
            } rounded-lg shadow hover:shadow-md transition-all font-medium`}
          >
            <MoveLeft />
          </button>

          <div className="flex gap-2">
            {shuffled ? (
              <button
                onClick={resetOrder}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-700"
                } rounded-lg shadow hover:shadow-md transition-all font-medium flex items-center gap-2`}
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            ) : (
              <button
                onClick={shuffleQuestions}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-700"
                } rounded-lg shadow hover:shadow-md transition-all font-medium flex items-center gap-2`}
              >
                <Shuffle className="w-4 h-4" />
                Shuffle
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-white text-indigo-600"
              } shadow hover:shadow-md transition-all`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-md p-4 mb-6`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "all" ? "All Tags" : tag}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowOnlyUnmastered(!showOnlyUnmastered)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  showOnlyUnmastered
                    ? "bg-indigo-600 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p
            className={`${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            } font-semibold`}
          >
            Question {currentIndex + 1} of {filteredQuestions.length}
          </p>
        </div>

        {filteredQuestions.length > 0 ? (
          <>
            <div
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-2xl shadow-xl p-8 min-h-[400px] cursor-pointer transform transition-all hover:shadow-2xl`}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-xs font-semibold ${
                        darkMode
                          ? "text-indigo-400 bg-indigo-900"
                          : "text-indigo-600 bg-indigo-100"
                      } px-3 py-1 rounded-full`}
                    >
                      Q{currentQuestion.id}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(currentQuestion.id);
                      }}
                      className={`p-2 rounded-full transition-all ${
                        masteredQuestions.has(currentQuestion.id)
                          ? darkMode
                            ? "bg-green-900 text-green-400"
                            : "bg-green-100 text-green-600"
                          : darkMode
                          ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>

                  {!showAnswer ? (
                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-800"
                        } mb-4`}
                      >
                        {currentQuestion.question}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {currentQuestion.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            } px-3 py-1 rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        } mb-3`}
                      >
                        ANSWER:
                      </h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed text-lg`}
                      >
                        {currentQuestion.answer}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center mt-8">
                  <p className="text-sm text-gray-500">
                    {showAnswer
                      ? "Click to see question"
                      : "Click to reveal answer"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? darkMode
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-gray-800 text-gray-200 shadow hover:shadow-md"
                    : "bg-white text-gray-700 shadow hover:shadow-md"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {filteredQuestions
                  .slice(Math.max(0, currentIndex - 2), currentIndex + 3)
                  .map((q, idx) => {
                    const actualIndex = Math.max(0, currentIndex - 2) + idx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentIndex(actualIndex);
                          setShowAnswer(false);
                        }}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          actualIndex === currentIndex
                            ? "bg-indigo-600 text-white shadow-lg"
                            : masteredQuestions.has(q.id)
                            ? darkMode
                              ? "bg-green-900 text-green-400 hover:bg-green-800"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                            : darkMode
                            ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {actualIndex + 1}
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={nextQuestion}
                disabled={currentIndex === filteredQuestions.length - 1}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  currentIndex === filteredQuestions.length - 1
                    ? darkMode
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-gray-800 text-gray-200 shadow hover:shadow-md"
                    : "bg-white text-gray-700 shadow hover:shadow-md"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div
            className={`${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
            } rounded-2xl shadow-xl p-8 text-center`}
          >
            <p className="text-xl">No questions match your filters</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderRevision = () => (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } p-4`}
    >
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setMode("menu")}
            className={`px-4 py-2 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
            } rounded-lg shadow hover:shadow-md transition-all font-medium`}
          >
            <MoveLeft />
          </button>
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-indigo-900"
            }`}
          >
            Revision Mode
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-white text-indigo-600"
            } shadow hover:shadow-md transition-all`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-md p-4 mb-6`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 border-gray-200"
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === "all" ? "All Tags" : tag}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowOnlyUnmastered(!showOnlyUnmastered)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  showOnlyUnmastered
                    ? "bg-indigo-600 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {showOnlyUnmastered ? "All" : "Unmastered"}
                </span>
              </button>
            </div>
          </div>
          <div
            className={`mt-3 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showing {filteredQuestions.length} of {questions.length} questions
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl shadow-md p-6 hover:shadow-lg transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-bold ${
                      darkMode
                        ? "text-indigo-400 bg-indigo-900"
                        : "text-indigo-600 bg-indigo-100"
                    } px-3 py-1 rounded-full`}
                  >
                    Q{q.id}
                  </span>
                  <h3
                    className={`text-lg font-bold ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {q.question}
                  </h3>
                </div>
                <button
                  onClick={() => toggleMastered(q.id)}
                  className={`p-2 rounded-full transition-all flex-shrink-0 ${
                    masteredQuestions.has(q.id)
                      ? darkMode
                        ? "bg-green-900 text-green-400"
                        : "bg-green-100 text-green-600"
                      : darkMode
                      ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>

              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-indigo-50"
                } rounded-lg p-4 mb-3`}
              >
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
                >
                  {q.answer}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {q.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className={`text-xs ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    } px-3 py-1 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mode === "menu" && renderMenu()}
      {mode === "flashcard" && renderFlashcard()}
      {mode === "revision" && renderRevision()}
    </>
  );
};

export default App;
