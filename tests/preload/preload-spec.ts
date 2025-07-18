/**
 * @vitest-environment node
 */

import { contextBridge } from 'electron';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { setupFiddleGlobal } from '../../src/preload/preload';

describe('preload', () => {
  // We instantiate this in `tests/setup.js` for the main and
  // renderer processes, but we don't need these mocks since
  // these things are being instantiated within the preload
  beforeEach(() => {
    delete (window as any).ElectronFiddle;
  });

  describe('setupGlobalWindow()', () => {
    it('exposes an ElectronFiddle object via the contextBridge', async () => {
      vi.mocked(contextBridge.exposeInMainWorld).mockReturnValue(undefined);
      await setupFiddleGlobal();

      expect(contextBridge.exposeInMainWorld).toHaveBeenCalledWith(
        'ElectronFiddle',
        expect.objectContaining({ startFiddle: expect.anything() }),
      );
    });
  });
});
