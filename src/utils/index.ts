


export const fetchData = async (
  url: string,
  method = "GET",
  headers = { "Content-type": "application/json" },
  searchValue = ""
) => {
  try {
    const response = await fetch(`${url}`, {
      method: method,
      headers: headers,
    });
    const data = await response.json();
    if (searchValue) {
      return data.data.filter((item: any) => {
        return item.discount.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
