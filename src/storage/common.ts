export type RemoteStatus = 'empty' | 'loading' | 'error' | 'success'

export interface StateData {
    status: RemoteStatus
    errorMsg?: string
}
