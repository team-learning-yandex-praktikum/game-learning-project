import { createAsyncThunk } from '@reduxjs/toolkit'

import { forumApi } from '@api'

export const getTopics = createAsyncThunk('forum/getTopics', forumApi.getTopics)
