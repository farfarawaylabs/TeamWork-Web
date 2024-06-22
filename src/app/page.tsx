"use client";

import Spinner from "@/components/Spinner";
import { sendCodingTask, sendCopywritingTask } from "@/services/api";
import { useRef, useState } from "react";
import Markdown from "react-markdown";

export default function Home() {
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);

  const onSendCodingTask = async () => {
    const task = taskRef.current?.value;

    if (!task) {
      return;
    }

    try {
      setResult(null);
      setIsWorking(true);
      const result = await sendCodingTask(task);
      setResult(result);
      setIsWorking(false);
    } catch (error) {
      setIsWorking(false);
      alert("Failed to send coding task");
    }
  };

  const onSendCopywritingTask = async () => {
    const task = taskRef.current?.value;

    if (!task) {
      return;
    }

    try {
      setResult(null);
      setIsWorking(true);
      const result = await sendCopywritingTask(task);

      setResult(result);
      setIsWorking(false);
      console.log(result);
    } catch (error) {
      setIsWorking(false);
      alert("Failed to send copywriting task");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full">
        <label htmlFor="task" className="block text-sm font-medium leading-6 text-gray-900">
          Add your task
        </label>
        <div className="mt-2">
          <textarea
            ref={taskRef}
            rows={4}
            name="task"
            id="task"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            defaultValue={""}
            disabled={isWorking}
          />
        </div>
        <div className="flex flex-row justify-center mt-4 space-x-4">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSendCopywritingTask}
            disabled={isWorking}
          >
            Send Copywriting Task
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSendCodingTask}
            disabled={isWorking}
          >
            Send Coding Task
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-8">
        {isWorking && <Spinner />}
        {result && (
          <div className="w-full">
            <h2 className="text-gray-900 font-semibold">Final Result:</h2>
            <textarea
              ref={taskRef}
              rows={4}
              name="task"
              id="task"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              defaultValue={""}
              value={result.finalAnswer}
            />
            <h3 className="text-gray-900 font-semibold mt-8 mb-4">Revisions:</h3>
            {result.revisions.map((revision: string, index: number) => (
              <>
                <h4 className="text-gray-700">{`Revision ${index}:`}</h4>
                <p className="text-gray-700 mb-8">{revision}</p>
              </>
            ))}

            <h3 className="text-gray-900 font-semibold mt-8 mb-4">Full team transcript:</h3>
            <Markdown className="text-gray-700 mb-8">{result.fullTeamDiscussion}</Markdown>
          </div>
        )}
      </div>
    </main>
  );
}
