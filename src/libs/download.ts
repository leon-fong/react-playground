import JSZip from "jszip";
import { Files } from "../components/playground/Context";
import { saveAs } from "file-saver";

export async function downloadFiles(files: Files) {
  const zip = new JSZip();

  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`);
}
