import { useState, useEffect } from 'react'
import AppBar from '~/components/appBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { Link, useLocation } from 'react-router-dom'
import randomColor from 'randomcolor'
import SidebarCreateBoardModal from './create'

import { styled } from '@mui/material/styles'
import { Grid } from '@mui/system'
import Loading from '~/components/Loading/Loading'
import { fetchBoardsAPI } from '~/apis/axios'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constant'
import { useDarkMode } from '~/utils/statusDarkmode'

// Styles của mấy cái Sidebar item menu
const SidebarItem = styled(Box)(() => {
  const status = useDarkMode()
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '12px 16px',
    borderRadius: '8px',
    color: status === 'dark' ? '#FFFFFF' : '#000000',
    '&:hover': { backgroundColor: status === 'dark' ? '#2c3e50' : '#17c0eb' },
    '&.active': {
      color: status === 'dark' ? '#FFFFFF' : '#FFFFFF',
      backgroundColor: status === 'dark' ? '#2c3e50' : '#17c0eb'
    }
  }
});




function Boards() {
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null)
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null)

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation()

  // load lại trang
  const [isLoad, setIsLoad] = useState(false)
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   */
  const page = parseInt(query.get('page') || '1', 10)

  useEffect(() => {

    // Gọi API lấy danh sách boards ở đây...
    fetchBoardsAPI(location.search).then(res => {
      setBoards(res.boads)
      setTotalBoards(res.totalBoards)
    })
  }, [location.search, isLoad])
  const status = useDarkMode()


  // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
  if (!boards) {
    return <Loading caption={'loading .....'} />

  }



  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 2 }} >
            <Stack direction="column" spacing={1} sx={{ p: 1, }}>
              <SidebarItem className="active" >
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              <SidebarItem
              >
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal isLoad={isLoad} setIsLoad={setIsLoad} />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 10 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards:</Typography>

            {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
            {boards?.length === 0 &&
              <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>No result found!</Typography>
            }

            {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
            {boards?.length > 0 &&
              <Grid container spacing={4} >
                {boards.map(b =>
                  <Grid size={{ xs: 10, sm: 6, md: 4 }} key={b._id}>
                    <Card sx={{ width: '250px' }}>
                      {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box>

                      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {b?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {b?.description}
                        </Typography>
                        <Box
                          component={Link}
                          to={`/board/${b?._id}`}
                          sx={{
                            mt: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            color: 'primary.main',
                            '&:hover': { color: 'primary.light' }
                          }}>
                          Go to board <ArrowRightIcon fontSize="small" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            }

            {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
            {(totalBoards > 0) &&
              <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  // Giá trị prop count của component Pagination là để hiển thị tổng số lượng page, công thức là lấy Tổng số lượng bản ghi chia cho số lượng bản ghi muốn hiển thị trên 1 page (ví dụ thường để 12, 24, 26, 48...vv). sau cùng là làm tròn số lên bằng hàm Math.ceil
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  // Giá trị của page hiện tại đang đứng
                  page={page}
                  // Render các page item và đồng thời cũng là những cái link để chúng ta click chuyển trang
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
