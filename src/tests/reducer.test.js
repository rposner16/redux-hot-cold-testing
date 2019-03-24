import reducer from '../reducer';
import {generateAuralUpdate, restartGame, makeGuess} from '../actions';


describe('reducer', () => {

    const initialState = {
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: ''
    };

    it('should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual(initialState.guesses);
        expect(state.feedback).toEqual(initialState.feedback);
        expect(state.auralStatus).toEqual(initialState.auralStatus);
    });
    
    it('should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('restartGame', () => {
        it('should restart the game when a correct answer is given', () => {
            let state = {
                guesses: [2, 4],
                feedback: 'Hot',
                auralStatus: '',
                correctAnswer: 10
            };
            state = reducer(state, restartGame(12));
            expect(state).toEqual({
                guesses: [],
                feedback: 'Make your guess!',
                auralStatus: '',
                correctAnswer: 12
            });    
        });    
    });

    describe('generateAuralUpdate', () => {
        it('should generate an aural update', () => {
            let state = {
                guesses: [2],
                feedback: 'Hot',
                auralStatus: '',
                correctAnswer: 10    
            };
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(`Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} guess. It was: ${state.guesses[0]}`);
            state = {
                guesses: [2, 4],
                feedback: 'Hot',
                auralStatus: '',
                correctAnswer: 10     
            };
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(`Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} guesses. In order of most- to least-recent, they are: 4, 2`);
        });
    });

    describe('makeGuess', () => {
        it('should return the correct feedback when the user makes a guess', () => {
            let state = {
                guesses: [],
                feedback: 'Make your guess!',
                auralStatus: '',
                correctAnswer: 12    
            }
            state = reducer(state, makeGuess('kj'));
            expect(state.feedback).toEqual('Please enter a valid number.');
            expect(state.guesses[0]).toEqual(NaN);
            state = reducer(state, makeGuess(72));
            expect(state.feedback).toEqual("You're Ice Cold...");
            state = reducer(state, makeGuess(43));
            expect(state.feedback).toEqual("You're Cold...");
            state = reducer(state, makeGuess(23));
            expect(state.feedback).toEqual("You're Warm.");
            state = reducer(state, makeGuess(14));
            expect(state.feedback).toEqual("You're Hot!");
            state = reducer(state, makeGuess(12));
            expect(state.feedback).toEqual('You got it!');
        });
    });
});