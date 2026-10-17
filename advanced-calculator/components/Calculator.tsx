"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  inputDigit,
  setOperator,
  evaluate,
  applyUnary,
  inputConstant,
  clear,
  allClear,
  backspace,
  toggleAngleMode,
  memoryStore,
  memoryRecall,
  memoryAdd,
  memoryClear,
} from "@/store/calculatorSlice";
import Display from "./Display";
import CalcButton from "./CalcButton";
import HistoryPanel from "./HistoryPanel";

export default function Calculator() {
  const dispatch = useAppDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const [showScientific, setShowScientific] = useState(true);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      switch (e.key) {
        case "0": case "1": case "2": case "3": case "4":
        case "5": case "6": case "7": case "8": case "9":
          dispatch(inputDigit(e.key)); break;
        case ".":
          dispatch(inputDigit(".")); break;
        case "+":
          dispatch(setOperator("+")); break;
        case "-":
          dispatch(setOperator("−")); break;
        case "*":
          dispatch(setOperator("×")); break;
        case "/":
          e.preventDefault();
          dispatch(setOperator("÷")); break;
        case "%":
          dispatch(setOperator("%")); break;
        case "^":
          dispatch(setOperator("^")); break;
        case "Enter": case "=":
          dispatch(evaluate()); break;
        case "Backspace":
          dispatch(backspace()); break;
        case "Escape":
          dispatch(allClear()); break;
        case "Delete":
          dispatch(clear()); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  return (
    <div className="flex gap-4 items-start justify-center">
      {/* Calculator Body */}
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-4 w-full max-w-sm border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-white font-bold text-lg tracking-wide">CalcPro</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowScientific(!showScientific)}
              className={`text-xs px-3 py-1 rounded-full transition font-medium ${
                showScientific
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Scientific
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`text-xs px-3 py-1 rounded-full transition font-medium ${
                showHistory
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Display */}
        <Display />

        {/* Scientific panel */}
        {showScientific && (
          <div className="grid grid-cols-4 gap-1.5 mb-1.5 mt-2">
            <CalcButton label="DEG/RAD" onClick={() => dispatch(toggleAngleMode())} variant="special" small />
            <CalcButton label="sin"  onClick={() => dispatch(applyUnary("sin"))}  variant="function" small />
            <CalcButton label="cos"  onClick={() => dispatch(applyUnary("cos"))}  variant="function" small />
            <CalcButton label="tan"  onClick={() => dispatch(applyUnary("tan"))}  variant="function" small />

            <CalcButton label="x²"   onClick={() => dispatch(applyUnary("x²"))}   variant="function" small />
            <CalcButton label="x³"   onClick={() => dispatch(applyUnary("x³"))}   variant="function" small />
            <CalcButton label="√"    onClick={() => dispatch(applyUnary("√"))}    variant="function" small />
            <CalcButton label="∛"    onClick={() => dispatch(applyUnary("∛"))}    variant="function" small />

            <CalcButton label="log"  onClick={() => dispatch(applyUnary("log"))}  variant="function" small />
            <CalcButton label="ln"   onClick={() => dispatch(applyUnary("ln"))}   variant="function" small />
            <CalcButton label="e^x"  onClick={() => dispatch(applyUnary("e^x"))} variant="function" small />
            <CalcButton label="10^x" onClick={() => dispatch(applyUnary("10^x"))} variant="function" small />

            <CalcButton label="1/x"  onClick={() => dispatch(applyUnary("1/x"))} variant="function" small />
            <CalcButton label="x!"   onClick={() => dispatch(applyUnary("x!"))}  variant="function" small />
            <CalcButton label="π"    onClick={() => dispatch(inputConstant("π"))} variant="special" small />
            <CalcButton label="e"    onClick={() => dispatch(inputConstant("e"))} variant="special" small />

            {/* Memory row */}
            <CalcButton label="MS" onClick={() => dispatch(memoryStore())}  variant="memory" small />
            <CalcButton label="MR" onClick={() => dispatch(memoryRecall())} variant="memory" small />
            <CalcButton label="M+" onClick={() => dispatch(memoryAdd())}    variant="memory" small />
            <CalcButton label="MC" onClick={() => dispatch(memoryClear())}  variant="memory" small />
          </div>
        )}

        {/* Main keypad */}
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          {/* Row 1 */}
          <CalcButton label="AC"  onClick={() => dispatch(allClear())}      variant="clear" />
          <CalcButton label="CE"  onClick={() => dispatch(clear())}         variant="clear" />
          <CalcButton label="⌫"  onClick={() => dispatch(backspace())}      variant="special" />
          <CalcButton label="÷"  onClick={() => dispatch(setOperator("÷"))} variant="operator" />

          {/* Row 2 */}
          <CalcButton label="7"  onClick={() => dispatch(inputDigit("7"))}  variant="digit" />
          <CalcButton label="8"  onClick={() => dispatch(inputDigit("8"))}  variant="digit" />
          <CalcButton label="9"  onClick={() => dispatch(inputDigit("9"))}  variant="digit" />
          <CalcButton label="×"  onClick={() => dispatch(setOperator("×"))} variant="operator" />

          {/* Row 3 */}
          <CalcButton label="4"  onClick={() => dispatch(inputDigit("4"))}  variant="digit" />
          <CalcButton label="5"  onClick={() => dispatch(inputDigit("5"))}  variant="digit" />
          <CalcButton label="6"  onClick={() => dispatch(inputDigit("6"))}  variant="digit" />
          <CalcButton label="−"  onClick={() => dispatch(setOperator("−"))} variant="operator" />

          {/* Row 4 */}
          <CalcButton label="1"  onClick={() => dispatch(inputDigit("1"))}  variant="digit" />
          <CalcButton label="2"  onClick={() => dispatch(inputDigit("2"))}  variant="digit" />
          <CalcButton label="3"  onClick={() => dispatch(inputDigit("3"))}  variant="digit" />
          <CalcButton label="+"  onClick={() => dispatch(setOperator("+"))} variant="operator" />

          {/* Row 5 */}
          <CalcButton label="±"  onClick={() => dispatch(applyUnary("±"))} variant="special" />
          <CalcButton label="0"  onClick={() => dispatch(inputDigit("0"))}  variant="digit" />
          <CalcButton label="."  onClick={() => dispatch(inputDigit("."))}  variant="digit" />
          <CalcButton label="="  onClick={() => dispatch(evaluate())}       variant="equals" />
        </div>

        {/* Extra operators row */}
        <div className="grid grid-cols-3 gap-1.5 mt-1.5">
          <CalcButton label="%" onClick={() => dispatch(setOperator("%"))}  variant="operator" small />
          <CalcButton label="xʸ" onClick={() => dispatch(setOperator("^"))} variant="operator" small />
          <CalcButton label="|x|" onClick={() => dispatch(applyUnary("abs"))} variant="function" small />
        </div>

        {/* Keyboard hint */}
        <p className="text-gray-600 text-xs text-center mt-3">
          ⌨️ Keyboard supported · Esc = AC · Del = CE
        </p>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="bg-gray-900 rounded-3xl shadow-2xl p-4 w-72 min-h-[400px] border border-gray-700 flex flex-col">
          <HistoryPanel />
        </div>
      )}
    </div>
  );
}
