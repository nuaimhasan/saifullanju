export const useGetData = async (endPoint) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endPoint}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
