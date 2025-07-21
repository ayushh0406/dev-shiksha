"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    monaco: any
    require: any
  }
}

interface MonacoProps {
  language?: string
  theme?: string
  value: string
  onChange?: (value: string) => void
  options?: any
}

export function Monaco({
  language = "javascript",
  theme = "vs-dark",
  value,
  onChange,
  options = {}
}: MonacoProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if Monaco is already loaded
    if (window.monaco && editorRef.current && !editorInstanceRef.current) {
      initializeEditor()
      return
    }

    // Load Monaco Editor only if not already loaded
    if (!window.monaco && !document.querySelector('script[src*="monaco-editor"]')) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/monaco-editor@0.45.0/min/vs/loader.js"
      script.async = true
      
      script.onload = () => {
        if (window.require) {
          window.require.config({
            paths: { vs: "https://unpkg.com/monaco-editor@0.45.0/min/vs" }
          })
          
          window.require(["vs/editor/editor.main"], () => {
            setIsLoaded(true)
            initializeEditor()
          })
        }
      }

      document.head.appendChild(script)
    }

    function initializeEditor() {
      if (editorRef.current && window.monaco && !editorInstanceRef.current) {
        // Clear any existing content
        editorRef.current.innerHTML = ''
        
        try {
          // Create editor instance
          editorInstanceRef.current = window.monaco.editor.create(editorRef.current, {
            value,
            language,
            theme,
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            minimap: { enabled: false },
            wordWrap: "on",
            folding: true,
            lineHeight: 22,
            letterSpacing: 0.5,
            fontFamily: 'Consolas, "Courier New", monospace',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: true,
            selectOnLineNumbers: true,
            glyphMargin: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            bracketPairColorization: {
              enabled: true
            },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            parameterHints: {
              enabled: true
            },
            ...options
          })

          // Listen for content changes
          editorInstanceRef.current.onDidChangeModelContent(() => {
            const currentValue = editorInstanceRef.current.getValue()
            onChange?.(currentValue)
          })
        } catch (error) {
          console.error('Error creating Monaco editor:', error)
        }
      }
    }

    return () => {
      // Cleanup
      if (editorInstanceRef.current) {
        try {
          editorInstanceRef.current.dispose()
          editorInstanceRef.current = null
        } catch (error) {
          console.error('Error disposing Monaco editor:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    // Update editor value when prop changes
    if (editorInstanceRef.current && editorInstanceRef.current.getValue() !== value) {
      try {
        editorInstanceRef.current.setValue(value)
      } catch (error) {
        console.error('Error setting Monaco editor value:', error)
      }
    }
  }, [value])

  useEffect(() => {
    // Update editor language
    if (editorInstanceRef.current && window.monaco) {
      try {
        const model = editorInstanceRef.current.getModel()
        if (model) {
          window.monaco.editor.setModelLanguage(model, language)
        }
      } catch (error) {
        console.error('Error setting Monaco editor language:', error)
      }
    }
  }, [language])

  useEffect(() => {
    // Update editor theme
    if (editorInstanceRef.current && window.monaco) {
      try {
        window.monaco.editor.setTheme(theme)
      } catch (error) {
        console.error('Error setting Monaco editor theme:', error)
      }
    }
  }, [theme])

  return (
    <div
      ref={editorRef}
      className="w-full h-full"
      style={{ minHeight: "200px", border: "none", overflow: "hidden" }}
    />
  )
}
