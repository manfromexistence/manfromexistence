import React from 'react';

import { act, render, renderHook } from '@testing-library/react';
import { useAtomStoreValue } from 'jotai-x';

import { createPlateEditor } from '../editor';
import { useFocused } from '../slate-react';
import { PlateController, usePlateControllerLocalStore } from '../stores';
import { Plate } from './Plate';
import { PlateControllerEffect } from './PlateControllerEffect';

const DebugPlateController = () => {
  const store = usePlateControllerLocalStore();
  const editorStores = useAtomStoreValue(store, 'editorStores');
  const activeId = useAtomStoreValue(store, 'activeId');
  const primaryEditorIds = useAtomStoreValue(store, 'primaryEditorIds');

  return (
    <div>
      {Object.entries(editorStores).map(([id, editorStore]) => (
        <p key={id}>
          {id}: {editorStore ? 'non-null' : 'null'}
        </p>
      ))}
      <p>activeId: {activeId ?? 'null'}</p>
      {primaryEditorIds.map((id) => (
        <p key={id}>primaryEditorId: {id}</p>
      ))}
    </div>
  );
};

const UnmountablePlate = ({
  children,
  initialMounted = true,
}: {
  children: React.ReactNode;
  initialMounted?: boolean;
}) => {
  const [mounted, setMounted] = React.useState(initialMounted);

  return (
    <div>
      <button onClick={() => setMounted(!mounted)} type="button">
        {mounted ? 'unmountPlate' : 'mountPlate'}
      </button>
      {mounted && children}
    </div>
  );
};

const FocusedContext = React.createContext(false);

jest.mock('../slate-react', () => ({
  ...jest.requireActual('../slate-react'),
  useFocused: () => React.useContext(FocusedContext),
}));

const ControlledFocusedContext = ({
  children,
  initialFocused = false,
}: {
  children: React.ReactNode;
  initialFocused?: boolean;
}) => {
  const [focused, setFocused] = React.useState(initialFocused);

  return (
    <FocusedContext.Provider value={focused}>
      <button onClick={() => setFocused(!focused)} type="button">
        {focused ? 'unfocus' : 'focus'}
      </button>
      {children}
    </FocusedContext.Provider>
  );
};

describe('ControlledFocusedContext', () => {
  it('sets useFocused to false', () => {
    const { result } = renderHook(() => useFocused(), {
      wrapper: ({ children }) => (
        <ControlledFocusedContext initialFocused={false}>
          {children}
        </ControlledFocusedContext>
      ),
    });

    expect(result.current).toBe(false);
  });

  it('sets useFocused to true', () => {
    const { result } = renderHook(() => useFocused(), {
      wrapper: ({ children }) => (
        <ControlledFocusedContext initialFocused={true}>
          {children}
        </ControlledFocusedContext>
      ),
    });

    expect(result.current).toBe(true);
  });
});

describe('PlateControllerEffect', () => {
  describe('when PlateController exists', () => {
    describe('when a non-primary editor mounts and unmounts', () => {
      const editor = createPlateEditor({
        id: 'test',
      });

      const children = (
        <PlateController>
          <UnmountablePlate>
            <Plate editor={editor} primary={false}>
              <PlateControllerEffect />
            </Plate>
          </UnmountablePlate>
          <DebugPlateController />
        </PlateController>
      );

      it('registers and unregisters the store', () => {
        const { getByText } = render(children);
        expect(getByText('test: non-null')).toBeInTheDocument();
        void act(() => getByText('unmountPlate').click());
        expect(getByText('test: null')).toBeInTheDocument();
        void act(() => getByText('mountPlate').click());
        expect(getByText('test: non-null')).toBeInTheDocument();
      });

      it('does not affect primaryEditorIds', () => {
        const { queryByText } = render(children);
        expect(queryByText('primaryEditorId: test')).not.toBeInTheDocument();
      });
    });

    describe('when the editor is focused', () => {
      it('becomes active', () => {
        const editor = createPlateEditor({
          id: 'test',
        });

        const { getByText } = render(
          <PlateController>
            <Plate editor={editor}>
              <ControlledFocusedContext>
                <PlateControllerEffect />
              </ControlledFocusedContext>
            </Plate>
            <DebugPlateController />
          </PlateController>
        );

        expect(getByText('activeId: null')).toBeInTheDocument();
        void act(() => getByText('focus').click());
        expect(getByText('activeId: test')).toBeInTheDocument();
      });
    });
  });

  describe('when a primary editor mounts and unmounts', () => {
    it('appends and removes the id from primaryEditorIds', () => {
      const { getByText, queryByText } = render(
        <PlateController primaryEditorIds={['1', '2']}>
          <UnmountablePlate initialMounted={false}>
            <Plate editor={createPlateEditor({ id: '3' })} primary={true}>
              <PlateControllerEffect />
            </Plate>
          </UnmountablePlate>
          <DebugPlateController />
        </PlateController>
      );

      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).not.toBeInTheDocument();
      void act(() => getByText('mountPlate').click());
      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).toBeInTheDocument();
      void act(() => getByText('unmountPlate').click());
      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).not.toBeInTheDocument();
    });
  });

  describe('when PlateController does not exist', () => {
    it('does not throw an error', () => {
      const { getByText } = render(
        <Plate editor={createPlateEditor()}>
          <PlateControllerEffect />
          <p>No error</p>
        </Plate>
      );

      expect(getByText('No error')).toBeInTheDocument();
    });
  });
});
