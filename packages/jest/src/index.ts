import ts from "typescript";

import type {
  TransformerCreator,
  TransformOptions,
  TransformedSource,
  SyncTransformer
} from "@jest/transform";

class TsTransformer implements SyncTransformer {
  process(
    sourceText: string,
    fileName: string,
    _options: TransformOptions<unknown>
  ): TransformedSource {
    const transpileResult = ts.transpileModule(sourceText, {
      reportDiagnostics: false,
      fileName,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleDetection: ts.ModuleDetectionKind.Auto
      }
    });
    return {
      code: transpileResult.outputText,
      map: transpileResult.sourceMapText
    };
  }
}

const createTransformer: TransformerCreator<
  SyncTransformer
> = transformerConfig => {
  return new TsTransformer();
};

export default { createTransformer };
