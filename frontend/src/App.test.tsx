import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

describe('Tests Unitaires App', () => {
    it('L\'application doit s\'afficher', () => {
        render(<App />);
        expect(document.body).toBeInTheDocument();
    });

    it('Test mathématique simple', () => {
        const sum = (a: number, b: number) => a + b;
        expect(sum(2, 3)).toBe(5);
    });
});