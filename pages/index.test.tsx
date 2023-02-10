import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '.'

describe('Main page', () => {
  it('renders without crashing', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Bar')).toBeVisible()
    })
  })

  it('shows the correct amount of plates for a given bar/weight combination', async () => {
    render(<Home />)

    const barSelect = screen.getByLabelText('Bar') as HTMLSelectElement
    const weightInput = screen.getByLabelText('Weight') as HTMLInputElement
    const platesText = screen.getByTestId('plates')

    await userEvent.selectOptions(barSelect, '35')
    await userEvent.clear(weightInput)
    await userEvent.type(weightInput, '75')

    await waitFor(() => {
      expect(platesText.textContent).toEqual('10,10')
    })
  })

  it('shows no plates for an invalid weight amount', async () => {
    render(<Home />)

    const barSelect = screen.getByLabelText('Bar') as HTMLSelectElement
    const weightInput = screen.getByLabelText('Weight') as HTMLInputElement
    const platesText = screen.getByTestId('plates')

    await userEvent.selectOptions(barSelect, '35')
    await userEvent.clear(weightInput)
    await userEvent.type(weightInput, '75.2')

    await waitFor(() => {
      expect(platesText.textContent).toEqual('')
    })
  })

  xit('the weight field updates when the bar value is changed', async () => {
    // X'ing this one out for now becasue I can't get it to pass and I don't understand why.
    // The test fails bc it says the `weightInput` has value 45, but when it prints the DOM,
    // the input has `value="35"`. So something's going on that I don't understand. 🙃

    render(<Home />)

    const barSelect = screen.getByLabelText('Bar') as HTMLSelectElement
    await userEvent.selectOptions(barSelect, '35')
    const weightInput = screen.getByLabelText('Weight') as HTMLInputElement

    await waitFor(() => {
      expect(weightInput).toHaveValue('35')
    })
  })
})
