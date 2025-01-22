export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
        console.log("Local Storage error", err)
      return undefined;
    }
  };
  