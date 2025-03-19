"use client";
import { useEffect, useRef } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { vim } from "@replit/codemirror-vim";
import { EditorState } from '@codemirror/state';

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

// Storage key for localStorage
const STORAGE_KEY = 'web-vim-content';

export default function Home() {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            // Get saved content from localStorage or use default
            const savedContent = localStorage.getItem(STORAGE_KEY) || "";

            const state = EditorState.create({
                doc: savedContent,
                extensions: [
                    vim(),
                    basicSetup,
                    customTheme,
                    // Save content to localStorage when it changes
                    EditorView.updateListener.of(update => {
                        if (update.docChanged) {
                            localStorage.setItem(STORAGE_KEY, update.state.doc.toString());
                        }
                    })
                ],
            });

            const view = new EditorView({
                state,
                parent: editorRef.current,
            });

            viewRef.current = view;

            return () => {
                view.destroy();
                viewRef.current = null;
            };
        }
    }, []);

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div id="editor" ref={editorRef} className="w-full h-full max-w-4xl p-4 bg-white flex-grow overflow-auto" />
        </div>
    );
}