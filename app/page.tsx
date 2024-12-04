"use client";
import { useEffect, useRef } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { vim } from "@replit/codemirror-vim";

// Define a custom theme to set the text color to black
const customTheme = EditorView.theme(
    {
        "&": {
            color: "black", // Set font color to black
        },
        ".cm-line": {
            color: "black", // Make sure the lines also have black text
        },
    },
    { dark: false }
);

export default function Home() {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            const view = new EditorView({
                doc: "Hello Web-Vim!",
                extensions: [
                    vim(),
                    basicSetup,
                    customTheme
                ],
                parent: editorRef.current,
            });

            return () => view.destroy();
        }
    }, []);

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div id="editor" ref={editorRef} className="w-full h-full max-w-4xl p-4 bg-white flex-grow overflow-auto"  />
        </div>
    );
}
