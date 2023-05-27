import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import ResidentsList from './ResidentsList/ResidentsList'
import AddResident from './AddResident/AddResident'
import SingleResident from './SingleResident/SingleResident'
import { ResidentsState } from './ResidentsState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import LoginSlice, { setLoginEmail } from '../Login/LoginSlice'
import ResidentsSlice, {
  setArrivalDate,
  setBirtDate,
  setColor,
  setDescription, setIsUpdate, setIsUpdateId,
  setName,
  setSize,
  setType
} from './ResidentsSlice'

describe('Residents page tests', () => {
  const initialState: ResidentsState = {
    isUpdate: false,
    residents: [],
    residentToAdd: {},
    residentDetails: {},
    fetchResidentsStatus: LoadingStatus.initial,
    addNewResidentStatus: LoadingStatus.initial,
    updateResidentStatus: LoadingStatus.initial,
    deleteResidentStatus: LoadingStatus.initial,
    addNewResidentImageStatus: LoadingStatus.initial,
    fetchResidentImageStatus: LoadingStatus.initial,
    fetchResidentDetailsStatus: LoadingStatus.initial
  }

  it('Should set resident name', () => {
    expect(ResidentsSlice(initialState, setName('Test name'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        name: 'Test name'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident type', () => {
    expect(ResidentsSlice(initialState, setType('Test type'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        type: 'Test type'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident color', () => {
    expect(ResidentsSlice(initialState, setColor('Test color'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        color: 'Test color'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident size', () => {
    expect(ResidentsSlice(initialState, setSize('Test size'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        size: 'Test size'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident birth date', () => {
    expect(ResidentsSlice(initialState, setBirtDate('Test date'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        birthDate: 'Test date'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident arrival date', () => {
    expect(ResidentsSlice(initialState, setArrivalDate('Test date'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        arrivalDate: 'Test date'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set resident description', () => {
    expect(ResidentsSlice(initialState, setDescription('Test description'))).toEqual({
      isUpdate: false,
      residents: [],
      residentToAdd: {
        description: 'Test description'
      },
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set isUpdate', () => {
    expect(ResidentsSlice(initialState, setIsUpdate(true))).toEqual({
      isUpdate: true,
      residents: [],
      residentToAdd: {},
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should set isUpdate ID', () => {
    expect(ResidentsSlice(initialState, setIsUpdateId('1'))).toEqual({
      isUpdate: false,
      isUpdateId: '1',
      residents: [],
      residentToAdd: {},
      residentDetails: {},
      fetchResidentsStatus: LoadingStatus.initial,
      addNewResidentStatus: LoadingStatus.initial,
      updateResidentStatus: LoadingStatus.initial,
      deleteResidentStatus: LoadingStatus.initial,
      addNewResidentImageStatus: LoadingStatus.initial,
      fetchResidentImageStatus: LoadingStatus.initial,
      fetchResidentDetailsStatus: LoadingStatus.initial
    })
  })

  it('Should render residents page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <ResidentsList />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should render  add resident page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <AddResident />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should render single resident page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <SingleResident />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})