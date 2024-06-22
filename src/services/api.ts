export const sendCodingTask = async (task: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teams/coders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error("Failed to send coding task");
  }

  const jsonResponse = await response.json();

  return jsonResponse;
};

export const sendCopywritingTask = async (task: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teams/copywriters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error("Failed to send copywriting task");
  }

  const jsonResponse = await response.json();

  return jsonResponse;
};
