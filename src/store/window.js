import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

const useWindowStore = create(
  immer((set)=>({
    windows:WINDOW_CONFIG,
    nextZindex:INITIAL_Z_INDEX + 1,
    openWindow : (windowkey,data = null) => 
      set((state)=>{
        const win = state.windows[windowkey];
        win.isOpen = true;
        win.zIndex = state.nextZindex;
        win.data = data ?? win.data;
        state.nextZindex ++;
      }),
    closeWindow : (windowkey) => 
      set((state)=>{
        const win = state.windows[windowkey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow : (windowkey) => 
      set((state)=>{
        const win = state.windows[windowkey];
        win.zIndex = state.nextZindex++;
      })
  }))
) 

export default useWindowStore;