import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import ErrorFormMessage from "../ErrorFormMessage";

interface MarkdownEditorProps {
  label: string;
  value: string;
  onChange: (value: string | undefined) => void;
  error: any;
  touched: any;
  readonly: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  label,
  value,
  onChange,
  error,
  touched,
  readonly,
}) => {
  return (
    <li className="flex flex-col gap-2">
      <label className="font-medium uppercase text-sm text-gray-900">
        {label}
      </label>
      {readonly ? (
        <div className="text-sm text-gray-900">
          <ReactMarkdown className="markdown">{value}</ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col">
          <div data-color-mode="light">
            <div className="wmde-markdown-var"> </div>
            <MDEditor
              className="bg-white text-black"
              value={value}
              onChange={onChange}
              preview="edit"
            />
          </div>
          {touched && error ? (
            <ErrorFormMessage
              message={
                typeof error === "string" ? error : JSON.stringify(error)
              }
            />
          ) : null}
        </div>
      )}
    </li>
  );
};

export default MarkdownEditor;
