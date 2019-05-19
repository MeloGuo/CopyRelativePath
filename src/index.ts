import * as vscode from 'vscode';
import * as clipboardy from 'clipboardy';
import * as path from 'path';

function getCurrentPageUri (): vscode.Uri | undefined {
  return vscode.window.activeTextEditor
      && vscode.window.activeTextEditor.document
      && vscode.window.activeTextEditor.document.uri;
}

function getRelativePath (targetUri: vscode.Uri): string {
  const activeUri = getCurrentPageUri();
  if (activeUri === undefined) {
    vscode.window.showErrorMessage('Don\'t open a file.');
    return '';
  }

  const activeDir = path.parse(activeUri.fsPath).dir;
  const targetPath = targetUri.fsPath;
  const relativePath = path.relative(activeDir, targetPath);
  return relativePath;
}

export const copyRelativePath = (targetUri: vscode.Uri): void => {
  const relativePath = getRelativePath(targetUri);  
  clipboardy.writeSync(relativePath);
};

export const copyRelativePathNoExt = (targetUri: vscode.Uri): void => {
  const relativePath = getRelativePath(targetUri);
  const pathAndExtArr = relativePath.split('.');
  const arrLength = pathAndExtArr.length;
  const relativePathNoExt = pathAndExtArr.slice(0, arrLength - 1).join('.');
  clipboardy.writeSync(relativePathNoExt);
};
