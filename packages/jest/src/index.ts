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
    sourcePath: string,
    { config: { extensionsToTreatAsEsm } }: TransformOptions<unknown>
  ): TransformedSource {
    const shouldTreatDotTsFileAsEsm = extensionsToTreatAsEsm.includes(".ts");

    // For now, transpileModule function cannot detect whether *.ts files to be treated as ESM.
    // In Jest context, we can detect this via `extensionsToTreatAsEsm` property and control transpiled module kind switching fileName extension.
    // See https://github.com/microsoft/TypeScript/issues/46452#issuecomment-1073154628
    const fileName = sourcePath.endsWith(".ts")
      ? sourcePath.replace(/\.ts$/, shouldTreatDotTsFileAsEsm ? ".mts" : ".cts")
      : sourcePath;

    const transpileResult = ts.transpileModule(sourceText, {
      reportDiagnostics: false,
      fileName,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.NodeNext,
        moduleDetection: ts.ModuleDetectionKind.Force
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
