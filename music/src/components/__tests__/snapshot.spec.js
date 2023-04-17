import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Snapshots SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'test',
      modified_name: 'test',
      original_name: 'test'
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
