import { useCallback, useEffect, useState } from "react";
import styles from "./calculator.module.scss";

interface CalculatorProps {
  display: string;
  previousValue: string;
  operation: string | null;
  isWaitingForNewValue: boolean;
}

export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorProps>({
    display: "0",
    previousValue: "",
    operation: null,
    isWaitingForNewValue: false,
  });

  const [history, setHistory] = useState<string[]>([]);

  const clear = useCallback(() => {
    setState({
      display: "0",
      previousValue: "",
      operation: null,
      isWaitingForNewValue: false,
    });
  }, []);

  const clearEntry = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      display: "0",
    }));
  }, []);

  const inputNumber = useCallback(
    (num: string) => {
      if (state.isWaitingForNewValue) {
        setState((prevState) => ({
          ...prevState,
          display: num,
          isWaitingForNewValue: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          display: prevState.display === "0" ? num : prevState.display + num,
        }));
      }
    },
    [state.isWaitingForNewValue]
  );

  const inputDecimal = useCallback(() => {
    if (state.isWaitingForNewValue) {
      setState((prevState) => ({
        ...prevState,
        display: "0.",
        isWaitingForNewValue: false,
      }));
    } else if (state.display.indexOf(".") === -1) {
      setState((prevState) => ({
        ...prevState,
        display: prevState.display + ".",
      }));
    }
  }, [state.display, state.isWaitingForNewValue]);

  const performOperation = useCallback(
    (nextOperation: string | null = null) => {
      const { display, previousValue, operation } = state;
      const inputValue = parseFloat(display);
      if (previousValue === "") {
        setState((prevState) => ({
          ...prevState,
          previousValue: display,
          operation: nextOperation,
          isWaitingForNewValue: true,
        }));
      } else if (operation) {
        const currentValue = parseFloat(previousValue);
        let result: number;
        switch (operation) {
          case "+":
            result = currentValue + inputValue;
            break;
          case "-":
            result = currentValue - inputValue;
            break;
          case "*":
            result = currentValue * inputValue;
            break;
          case "/":
            if (inputValue === 0) {
              setState((prev) => ({
                ...prev,
                display: "Error",
                previousValue: "",
                operation: null,
                isWaitingForNewValue: true,
              }));
              return;
            }
            result = currentValue / inputValue;
            break;
          default:
            return;
        }
        const resultString = String(result);
        const calculation = `${previousValue} ${operation} ${display} = ${resultString}`;
        setHistory((prevHistory) => [calculation, ...prevHistory.slice(0, 4)]);
        setState((prevState) => ({
          ...prevState,
          display: resultString,
          previousValue: nextOperation ? resultString : "",
          operation: nextOperation,
          isWaitingForNewValue: true,
        }));
      }
    },
    [state]
  );

  const calculate = useCallback(() => {
    performOperation();
  }, [performOperation]);

  const handleOperationClick = useCallback(
    (operation: string) => {
      performOperation(operation);
    },
    [performOperation]
  );

  useEffect(() => {
    const handleButtonClick = (event: KeyboardEvent) => {
      const { key } = event;
      if (key >= "0" && key <= "9") {
        inputNumber(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+" || key === "-" || key === "*") {
        handleOperationClick(key);
      } else if (key === "/") {
        event.preventDefault();
        handleOperationClick("/");
      } else if (key === "Enter" || key === "=") {
        calculate();
      } else if (key === "Escape") {
        clear();
      } else if (key === "Backspace") {
        clearEntry();
      }
    };

    window.addEventListener("keydown", handleButtonClick);
    return () => {
      window.removeEventListener("keydown", handleButtonClick);
    };
  }, [
    inputNumber,
    inputDecimal,
    handleOperationClick,
    calculate,
    clear,
    clearEntry,
  ]);

  return (
    <>
      <div className={styles.calculator}>
        <div>
          <h1>My Calculator</h1>
          <img src="./calImg.jpg" alt="cartoonImage" className={styles.image} />
        </div>

        <div className={styles.inner}>
          <div className={styles.display_section}>
            <div className={styles.display}>{state.display}</div>
            {state.operation && state.previousValue && (
              <div className={styles.previous_display}>
                {state.previousValue} {state.operation}
              </div>
            )}
          </div>
          <div className={styles.container}>
            <button
              onClick={clear}
              className={`${styles.button} ${styles.btn}`}
            >
              C
            </button>
            <button
              onClick={clearEntry}
              className={`${styles.button} ${styles.btn}`}
            >
              CE
            </button>
            <button
              onClick={() => {
                handleOperationClick("/");
              }}
              className={`${styles.button} ${styles.btn}`}
            >
              /
            </button>
            <button
              onClick={() => {
                handleOperationClick("*");
              }}
              className={`${styles.button} ${styles.btn}`}
            >
              *
            </button>

            <button
              onClick={() => {
                inputNumber("7");
              }}
              className={styles.button}
            >
              7
            </button>
            <button
              onClick={() => {
                inputNumber("8");
              }}
              className={styles.button}
            >
              8
            </button>
            <button
              onClick={() => {
                inputNumber("9");
              }}
              className={styles.button}
            >
              9
            </button>
            <button
              onClick={() => {
                handleOperationClick("-");
              }}
              className={styles.button}
            >
              -
            </button>

            <button
              onClick={() => {
                inputNumber("4");
              }}
              className={styles.button}
            >
              4
            </button>
            <button
              onClick={() => {
                inputNumber("5");
              }}
              className={styles.button}
            >
              5
            </button>
            <button
              onClick={() => {
                inputNumber("6");
              }}
              className={styles.button}
            >
              6
            </button>
            <button
              onClick={() => {
                handleOperationClick("+");
              }}
              className={styles.button}
            >
              +
            </button>

            <button
              onClick={() => {
                inputNumber("1");
              }}
              className={styles.button}
            >
              1
            </button>
            <button
              onClick={() => {
                inputNumber("2");
              }}
              className={styles.button}
            >
              2
            </button>
            <button
              onClick={() => {
                inputNumber("3");
              }}
              className={styles.button}
            >
              3
            </button>
            <button
              onClick={() => {
                calculate();
              }}
              className={styles.button}
            >
              =
            </button>

            <button
              onClick={() => {
                inputNumber("0");
              }}
              className={styles.zero}
            >
              0
            </button>
            <button
              onClick={() => {
                inputDecimal();
              }}
              className={styles.button}
            >
              .
            </button>
          </div>
        </div>
      </div>
      {history.length > 0 && (
        <div className={styles.history}>
          <h3>History</h3>
          <ul>
            {history.map((calculation, index) => (
              <li key={index}>{calculation}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
