import React from 'react'; 
import { fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App';

global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

describe('<App /> component', () => {

  let AppDom;
  beforeEach(() => {
    AppDom = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDom.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
      expect(AppDom.querySelector('#city-search')).toBeInTheDocument();
  });

  test('renders NumberOfEvents', () => {
    expect(AppDom.querySelector('#numberOfEvents')).toBeInTheDocument();
  })

});

describe('<App /> integration', () =>{

  let AppDom;
  beforeEach(() => {
    AppDom = render(<App />).container.firstChild;
  })

  test("renders the correct number of events when the number of events input is changed", async () => {
    const { container } = render(<App />); 

    const noeComponent = container.querySelector('#numberOfEvents');
    const eventListComponent = container.querySelector('#event-list');
  
    await waitFor(() => {
      expect(noeComponent).toBeInTheDocument();
      expect(eventListComponent).toBeInTheDocument();
    });
  
    let events = eventListComponent.querySelectorAll('#event'); 
  
    const noeInput = noeComponent.querySelector('.number');
    
    fireEvent.change(noeInput, { target: { value: 10 } });
  
    await waitFor(() => {
      events = eventListComponent.querySelectorAll('#event');
  
      expect(events.length).toBe(Number(noeInput.value));
    });
  });

})