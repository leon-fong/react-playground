import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Header from "../Header";

const Playground = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className="!h-[calc(100%-50px)]">
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment> 
      </main>
    </div>
  );
};

export default Playground;
