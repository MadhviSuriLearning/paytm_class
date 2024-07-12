function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route is a component that takes up 2 props path and element */}
        <Route path="/signup" element={<signup />} />
        <Route path="/signin" element={<signin />} />
        <Route path="/dashboard" element={<dashboard />} />
        <Route path="/send" element={<send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
