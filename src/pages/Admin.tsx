import { useState } from "react";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMutation } from "react-query";

import FileUploadService from "../shared/services/file-upload";
import PostsService from "../shared/services/posts";
import Loader from "../shared/components/Loader";

import ValidateCreatePost from "../utils/validation/create-post";

export default function AdminPage() {
  let ckeditor;
  const [editorData, setEditorData] = useState("");
  const [state, setState] = useState({
    category: "best-practices",
    summary: "",
  });
  const [attachmentUrl, setAttachmentUrl] = useState(null);

  const fileUploadMutation = useMutation((formData: FormData) =>
    FileUploadService.fileUploadHandler(formData)
  );

  const formSubmitMutation = useMutation((dto) =>
    PostsService.createPostHandler(dto)
  );

  const handleOnChange = (e: any, value: keyof typeof state) => {
    const target = e.target.value;
    console.log(target)
    setState((prevState) => ({
      ...prevState,
      [value]: target,
    }));
  };

  const handleAttachment = async (e: any) => {
    const file = e.target.files[0];

    // upload file to server
    const formData = new FormData();
    formData.append("files", file);

    const { data } = await fileUploadMutation.mutateAsync(formData);
    setAttachmentUrl(data.url);
  };

  const handleResetMutation = (mutation: string) => {
    if ((mutation = "submit")) {
      formSubmitMutation.reset();
    } else {
      fileUploadMutation.reset();
    }
  };

  const isFormValid = (dto: any) => {
    const validation = ValidateCreatePost(dto);
    if (!validation) {
      const error = ValidateCreatePost.errors![0] as unknown as Record<
        string,
        unknown
      >;
      toast(errorMessage(error), { type: "error" });
      return false;
    }
    return true;
  };

  const errorMessage = (error: Record<string, unknown>) => {
    const { instancePath, message } = error as {
      instancePath: string;
      message: string;
    };
    const [, path] = instancePath.split("/");
    return `${path} ${message}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dto = {
      category: state.category,
      summary: state.summary,
      description: editorData,
      attachment: attachmentUrl,
      user: ".",
    } as any;

    if (isFormValid(dto)) await formSubmitMutation.mutateAsync(dto);
  };

  if (formSubmitMutation.isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-5xl text-gray-500 font-bold mb-10">Admin</h1>

      {fileUploadMutation.isError && (
        <div
          className="w-72 p-2 mb-3  bg-red-400 text-white rounded-lg text-sm"
          onClick={() => handleResetMutation("submit")}
        >
          Error while uploading file.
        </div>
      )}

      {formSubmitMutation.isError && (
        <div
          className="w-72 p-2 mb-3  bg-red-400 text-white rounded-lg text-sm"
          onClick={() => handleResetMutation("submit")}
        >
          Error while creating.
        </div>
      )}

      {formSubmitMutation.isSuccess && (
        <div
          className="w-72 p-2 mb-3  bg-emerald-500 text-white rounded-lg text-sm"
          onClick={() => handleResetMutation("submit")}
        >
          Success
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="m-2 flex flex-col gap-1">
          <label className="text-gray-600 font-sans">Category</label>
          <select
            defaultValue={"best-practices"}
            className="p-2 bg-gray-200 rounded-lg outline-none"
            onChange={(event) => handleOnChange(event, "category")}
          >
            <option value="best-practices">Best Practices</option>
            <option value="how-to">How to</option>
          </select>
        </div>

        <div className="m-2 flex flex-col gap-1">
          <label className="text-gray-600 font-sans">Summary*</label>
          <input
            type="text"
            className="p-2 bg-gray-200 rounded-lg outline-none"
            onChange={(event) => handleOnChange(event, "summary")}
          />
        </div>

        <div className="m-2 flex flex-col gap-1">
          <label className="text-gray-600 font-sans">Description*</label>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onReady={(editor: any) => {
              ckeditor = editor;
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>

        <div className="m-2 flex flex-col gap-1">
          <label className="text-gray-600 font-sans">Attachment</label>
          <div className="w-full h-40 bg-gray-200 rounded-lg flex flex-col justify-center items-center font-bold">
            <input type="file" onChange={handleAttachment} />
          </div>
          {attachmentUrl && (
            <img
              src={attachmentUrl}
              className="h-40 w-full bg-cover rounded-lg"
            />
          )}
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="m-2 p-2 w-full bg-emerald-500 text-white font-bold tracking-wider rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
