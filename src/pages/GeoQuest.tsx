
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { checkContestJoined, fetchGeoQuestQuestions, submitGeoQuestAnswers, GeoQuestion } from "@/services/geoQuestService";
import { Globe, Timer, AlertCircle, Check, X } from "lucide-react";

const GeoQuest = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<GeoQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(10); // 10 seconds per question
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [hasJoined, setHasJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultType, setResultType] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if user has joined the contest
  useEffect(() => {
    const checkJoinStatus = async () => {
      if (contestId) {
        try {
          const { joined, error: joinError } = await checkContestJoined(contestId);
          
          if (joinError) {
            throw new Error(joinError);
          }
          
          setHasJoined(joined);
          
          if (!joined) {
            navigate(`/competitions?gameType=geoquest`);
            toast.error("You must join this contest before playing");
          } else {
            // Load questions only if the user has joined
            loadQuestions();
          }
        } catch (error) {
          console.error("Error checking join status:", error);
          toast.error("Failed to verify contest participation");
          navigate("/competitions?gameType=geoquest");
        }
      }
    };
    
    const checkAuthAndJoinStatus = async () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (!isAuthenticated) {
        toast.error("Please sign in to play GeoQuest");
        navigate("/login");
        return;
      }
      
      checkJoinStatus();
    };
    
    checkAuthAndJoinStatus();
  }, [contestId, navigate]);
  
  // Load questions for the contest
  const loadQuestions = async () => {
    if (!contestId) return;
    
    setIsLoading(true);
    
    try {
      const { questions: fetchedQuestions, error: questionsError } = await fetchGeoQuestQuestions(contestId);
      
      if (questionsError) {
        throw new Error(questionsError);
      }
      
      if (fetchedQuestions.length === 0) {
        throw new Error("No questions found for this contest");
      }
      
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill(-1));
    } catch (error) {
      console.error("Error loading questions:", error);
      setError(typeof error === 'string' ? error : "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    startTimer();
  };
  
  // Start timer for the current question
  const startTimer = () => {
    setTimeLeft(10);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // Time's up for this question
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  
  // Handle timeout for the current question
  const handleTimeout = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = -1; // -1 indicates no answer (timeout)
    setAnswers(newAnswers);
    
    setResultType('timeout');
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      goToNextQuestion();
    }, 1500);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };
  
  // Submit the selected answer and go to the next question
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    clearInterval(timerRef.current!);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    // Show result feedback
    setResultType('correct'); // Simplification: we don't know correct answers on client
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      goToNextQuestion();
    }, 1500);
  };
  
  // Go to the next question or finish the game
  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      startTimer();
    } else {
      // Game finished
      finishGame();
    }
  };
  
  // Finish the game and submit answers
  const finishGame = async () => {
    setGameFinished(true);
    
    try {
      // Convert any -1 (timeout) to random answers between 0-3 as required by API
      const submittableAnswers = answers.map(answer => 
        answer === -1 ? Math.floor(Math.random() * 4) : answer
      );
      
      const { data, error: submitError } = await submitGeoQuestAnswers(contestId!, submittableAnswers);
      
      if (submitError) {
        throw new Error(submitError);
      }
      
      if (data && data.success) {
        setTotalScore(data.score);
        toast.success(`Your score: ${data.score}/10`);
      } else {
        throw new Error(data?.message || "Failed to submit answers");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit your answers. Please try again.");
    }
  };
  
  // Navigate to leaderboard
  const goToLeaderboard = () => {
    navigate(`/geoquest/${contestId}/leaderboard`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Globe className="h-16 w-16 mb-4 mx-auto animate-pulse text-blue-500" />
            <h2 className="text-2xl font-bold mb-2">Loading GeoQuest...</h2>
            <p className="text-muted-foreground">Preparing your geography adventure</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto max-w-2xl">
            <div className="flex flex-col items-center justify-center bg-destructive/10 text-destructive p-8 rounded-lg">
              <AlertCircle className="h-16 w-16 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p className="mb-6 text-center">{error}</p>
              <Button onClick={() => navigate("/competitions?gameType=geoquest")}>
                Back to Competitions
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-4xl">
          {!gameStarted ? (
            <Card className="p-8 text-center">
              <Globe className="h-16 w-16 mb-4 mx-auto text-blue-500" />
              <h1 className="text-3xl font-bold mb-4">GeoQuest Challenge</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Test your geography knowledge with 10 questions. You'll have 10 seconds to answer each question.
              </p>
              <div className="mb-6 max-w-lg mx-auto">
                <h3 className="text-xl font-semibold mb-3">How to Play:</h3>
                <ul className="text-left space-y-2 mb-6">
                  <li>• You'll be shown 10 geography questions with images</li>
                  <li>• Each question has 4 multiple-choice options</li>
                  <li>• You have 10 seconds to answer each question</li>
                  <li>• Score points for each correct answer</li>
                  <li>• Your final score determines your position on the leaderboard</li>
                </ul>
              </div>
              <Button size="lg" onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
                Start Challenge
              </Button>
            </Card>
          ) : gameFinished ? (
            <Card className="p-8 text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Challenge Complete!</h1>
                {totalScore !== null ? (
                  <div>
                    <div className="text-6xl font-bold mb-6">{totalScore}/10</div>
                    <p className="text-xl mb-8">
                      {totalScore >= 8 ? "Excellent! You're a geography expert!" :
                       totalScore >= 5 ? "Good job! You have solid geography knowledge." :
                       "Keep exploring! Practice makes perfect."}
                    </p>
                    <Button size="lg" onClick={goToLeaderboard} className="bg-amber-500 hover:bg-amber-600">
                      View Leaderboard
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-xl mb-4">Submitting your answers...</div>
                    <div className="spinner mx-auto"></div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <div>
              {/* Game progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                  <div className="flex items-center">
                    <Timer className="w-4 h-4 mr-1 text-red-500" />
                    <span className={`font-bold ${timeLeft <= 3 ? "text-red-500 animate-pulse" : ""}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
              </div>
              
              {/* Current question */}
              <Card className="mb-6 overflow-hidden">
                {showResult && (
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    resultType === 'correct' ? "bg-green-500/90" :
                    resultType === 'incorrect' ? "bg-red-500/90" :
                    "bg-amber-500/90"
                  } z-10`}>
                    {resultType === 'correct' ? (
                      <div className="flex flex-col items-center text-white">
                        <Check className="w-16 h-16 mb-2" />
                        <span className="text-xl font-bold">Correct!</span>
                      </div>
                    ) : resultType === 'incorrect' ? (
                      <div className="flex flex-col items-center text-white">
                        <X className="w-16 h-16 mb-2" />
                        <span className="text-xl font-bold">Incorrect</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-white">
                        <Timer className="w-16 h-16 mb-2" />
                        <span className="text-xl font-bold">Time's Up!</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="h-60 md:h-80 bg-gray-100 relative">
                  <img 
                    src={questions[currentQuestionIndex]?.image_url} 
                    alt="Geography location" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    {questions[currentQuestionIndex]?.question_text}
                  </h3>
                  
                  <RadioGroup value={selectedAnswer?.toString() || ""} className="space-y-3">
                    {questions[currentQuestionIndex]?.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all ${
                          selectedAnswer === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Card>
              
              {/* Submit button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  disabled={selectedAnswer === null}
                  onClick={handleSubmitAnswer}
                  className="w-full max-w-md"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GeoQuest;
