import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useFormik } from "formik";
import { Comment } from "@/api";
import { useAuth } from "@/hooks";

export const SendComment = ({ id, onEvent }: any) => {
  const commentClient = new Comment();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await commentClient.createComment({
          description: values.description,
          experiment: [id],
          user: user.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        onEvent({ id: id });
        formik.resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8 flex flex-col">
      <p className="font-medium uppercase text-sm text-gray-900 mb-2">
        Escribe un nuevo comentario
      </p>
      <div data-color-mode="light">
        <div className="wmde-markdown-var"> </div>
        <MDEditor
          className="bg-white text-black"
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue("description", value)}
          preview="edit"
        />
      </div>
      <button
        className={`
          mt-4 text-white flex self-end
          items-center font-medium 
          rounded-full text-sm px-5 py-2.5 
          text-center w-32 justify-center
          ${
            formik.values.description !== ""
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
};
