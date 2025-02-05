import TableProvider from "@/context/TableProvider";
import TableView from "@/components/Table/TableView";

const App = () => (
  <TableProvider>
    <TableView />
  </TableProvider>
);

export default App;
