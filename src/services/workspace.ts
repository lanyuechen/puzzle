import workspace from '@/work/workspace.json';

/**
 * 加载工作空间
 */
export async function load() {
  if (!localStorage.__puzzle_workspace) {
    return workspace;
  }
  try {
    return JSON.parse(localStorage.__puzzle_workspace);
  } catch(err) {
    // do nothing
  }
}

/**
 * 保存工作空间
 */
export async function save(workspace: any) {
  localStorage.__puzzle_workspace = JSON.stringify(workspace);
}