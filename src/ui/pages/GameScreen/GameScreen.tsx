import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { AsyncUtils } from '@util/common/AsyncUtils.ts'
import { MathUtils } from '@util/common/MathUtils.ts'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil.ts'
import PageBackBtn from 'src/ui/components/PageBackBtn/PageBackBtn.tsx'
import { Pages } from 'src/ui/components/Pages/Pages'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
//import rays from '@img/rays.png'
//import swing from '@audio/swing.mp3'
//import unknownAva from '@img/ava-unknown.png'
//import btnRock from '@img/btn-rock.png'
//import btnRockActive from '@img/btn-rock-active.png'
//import btnScissors from '@img/btn-scissors.png'
//import btnScissorsActive from '@img/btn-scissors-active.png'
//import btnPaper from '@img/btn-paper.png'
//import btnPaperActive from '@img/btn-paper-active.png'
//import rock from '@img/rock.png'
//import scissors from '@img/scissors.png'
//import paper from '@img/paper.png'
import Button from 'src/ui/elements/Button/Button.tsx'
import { ButtonStyle } from 'src/ui/elements/Button/ButtonStyle.ts'
import { EmotionCommon } from 'src/ui/style/EmotionCommon.ts'
import useSound from 'use-sound'
import randomInt = MathUtils.randomInt
import abs = EmotionCommon.abs
import Txt = EmotionCommon.Txt
import row = EmotionCommon.row
import center = EmotionCommon.center
import rotateAnim = EmotionCommon.rotateAnim
import awaitValue = AsyncUtils.awaitValue
import awaitCallback = AsyncUtils.awaitCallback

type Player = {
  ava: HTMLImageElement
  name: string
}

let enemyPlayer : Player;
let enemies = [
  ['Андрей', 'https://sun3-9.userapi.com/s/v1/if2/R2uC-AgaqmhAAQg2GVu98lC-hjNXFJX8YIWsx5wWr41fat8zv7Rv6Ir57T7NA77kQHj_mRGd5LFmZ8DPf-pBhNUZ.jpg?quality=95&crop=960,1193,319,319&as=50x50,100x100,200x200&ava=1&u=0QT7OygNsVaalrxEYgoHT0KcIz_tCOEAp32nf3FHWBI&cs=100x100'],
  ['Марат', 'https://sun3-23.userapi.com/s/v1/ig2/jYmX8QJjUpjj6E_w8exXHgqDhSo8AlBKCe-k1u96haWzQsHwiVHO9wCAzz1OuiEkQj5urQ-FqHb1bKFKc6ttRr8m.jpg?quality=95&crop=0,48,1920,1920&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=9aR-nE1N3dcDQCR31z1Gm1hviiddvD8OcYfLiQey0FQ&cs=100x100'],
  ['Илья', 'https://sun3-18.userapi.com/s/v1/ig2/c1s8ZafxQPEJsd6uyr0QuYR6_TLQpPCrsBdeicu5x3LYdZIqksIhRreQgNAf4I-amnmjJoYAqPp9etktmCWtnt_e.jpg?quality=95&crop=183,333,539,539&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&u=XWmUAZz1VsxsLv2s7Im_9d5balCKa4SGTRm1jiUtT4M&cs=100x100'],
  ['Андрей', 'https://sun3-23.userapi.com/s/v1/ig2/cELfrlZhVsDJ9TE3ClfRuOjCSnHPjfjAgoE1bOp3XjG1HHu88GQxQdGOzClblC8XsEUg67m0Wo4C5Vyyg3_pC-Jl.jpg?quality=95&crop=300,252,1048,1048&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-8.userapi.com/s/v1/if1/7jzZ9CXhJP5mtvrZA1g6JBkMGSR5qlgQWwTR5OoMEVZ9Csvy6L6dp8VpYQcEWmORMZ9ImDvE.jpg?quality=96&crop=21,3,666,666&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-17.userapi.com/s/v1/if1/5X9zLSRlcZaa9AwVxihLs_EQ3G9tzuDNAQvF1Iai4hwVGaLdm9TQ1ztZiA0GvlT2SnucQRaN.jpg?quality=96&crop=749,30,762,762&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Артур', 'https://sun3-24.userapi.com/s/v1/ig2/arclZft6OPDb_e948yJx2tE83qR3SAXQiNXIpJCWbGYGoq2wqABZCN-uuzniBdqM4xsEoHS_7vg7eMlR9UCQPh-V.jpg?quality=95&crop=108,348,1332,1332&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Григорий', 'https://sun3-4.userapi.com/s/v1/ig2/g874nDfVXEF_vNFY904di-qFnB0WVw6otFUydG22mtSEcGkuk29wv2x-vW0ssLjDDbzqRj7RzsFQYYrw2s-p_SVP.jpg?quality=95&crop=0,621,1440,1440&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Павел', 'https://sun3-22.userapi.com/s/v1/if1/xjMtsfAA8SdmgDs2tNLUbO5mzkoON0zdYCih7jYpHoOXOLq94ffqTtUHYvoVDlvoUUEPxayt.jpg?quality=96&crop=0,189,1431,1431&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-6.userapi.com/s/v1/if2/vmEOQPsIs4qSzmagZD7EH0YP7RI-tU6ag2WCnmCFcpA6_5TD-Sq6oPqVpNIUyMeVT0upDA_pjsjFO1TaAH933BP6.jpg?quality=96&crop=577,259,1401,1401&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Федя', 'https://sun3-20.userapi.com/s/v1/ig1/IVqlep4b3W5XM-2jQ5usWC8a7UW7KmTipTqYeIHjP9EXEqoe3EfwPyZ8gZAiOoLBbawGvzkO.jpg?quality=96&crop=0,161,768,768&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-22.userapi.com/s/v1/ig2/yb8x6zw6J8-8cSTgQ0DiX9wksGE2mszgD8m20KSFjwmk18TkZQmCUl48e4p2T4nY88lWTIbDE9sBnMGnvq83Ai7J.jpg?quality=96&crop=313,474,773,773&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-22.userapi.com/s/v1/ig2/zIoqL0lyjMlBFAuRTkOcqXHTrPhT8QZAFByvLOqaCyjSQ8M1mt1sMYy_sqk4-BjU2XEExSgJ_TZP4H38oQ-8yaR1.jpg?quality=96&crop=0,120,960,960&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Антон', 'https://sun3-18.userapi.com/s/v1/ig1/ozJ10Lm1bOSAoTBwr3vF261UUUGHj8G7VJ78-8XVtGImmdUOxRMyEOJyip6h7tOORHmSL6jF.jpg?quality=96&crop=625,374,965,965&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Андрей', 'https://sun3-22.userapi.com/s/v1/ig2/PrxoCTyzs7EG0xj3FDBE6YZUYpQ_-G8z0fG4VIsvF6Qt9nZYHVR1qGJHtsTXzYpDp1xAN7pUQZG3juKC2CmvIy0J.jpg?quality=95&crop=496,1356,1164,1164&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-17.userapi.com/s/v1/ig2/bWpGG_7xVQNGthvZfXgr7ftpTDO_WgJraQUVx36oz04gdUxD7Y1M9ZIhFX51hG_Hyu9V8f5ybfJTF4_iMsqg2BHP.jpg?quality=95&crop=398,136,606,606&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Андрей', 'https://sun3-18.userapi.com/s/v1/if1/1ieyBITelRRnK5ExMtKD7i_ufjO-BUb7ckvicktGe0ZjZXrIuAkAS4nK0I0san2Li6_2Zw.jpg?quality=96&crop=0,111,720,720&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Илья', 'https://sun3-24.userapi.com/s/v1/if1/R7BCugx0Fq9hCN-j7VMsvYRj4BZwxX0RQWjqUekgJerA-I7Ou6EcET2d9funpg9W4fY8DN7f.jpg?quality=96&crop=96,96,768,768&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Владимир', 'https://sun3-17.userapi.com/s/v1/ig2/P_AlJSE4zWLNaMCz9Hs0hfk09S3UpcbccikjliRoKit4nNNmzpE6DWvY3bwIjr1ydoTmzkZV7TNyfGAOBfy20zEo.jpg?quality=95&crop=158,1,768,768&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Иван', 'https://sun3-20.userapi.com/s/v1/ig2/vO5AEm9_T-iKvL-FLP_aEFm04EgWuseabA9JVdNIjFxxwCJSByrpud80Xod3e0EFu0jCQVDaL2s5zTKcy_4kHuO0.jpg?quality=95&crop=347,547,1157,1157&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-22.userapi.com/s/v1/ig2/6jUPn_7WDJJ-0gTLveZPSJonSKP3Ie7OtQxF8iWQFCllCT1BtPObT8uK-Ps-WQJO_6t0vCdWhfv58ijeEBqG2Gb7.jpg?quality=95&crop=96,0,678,678&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Рустам', 'https://sun3-17.userapi.com/s/v1/ig2/9bevLb2D69GF4nR7gxQkaPZyGsFcvSGZJU4iwa_W04cunVQR0EdXRTnhEVSEcxKxDnDoPEgYrudcE_U-g1v1jIkt.jpg?quality=95&crop=352,307,1121,1121&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Никита', 'https://sun3-23.userapi.com/s/v1/ig2/bgdkYLXAhV0aVlNAdFwgPrKwG3cM2z2WVaeepeju9ZBVcdHbjwqw8nkPOTDJLHt6-2RSjAwlpIPXQxwxelMGav0d.jpg?quality=95&crop=169,0,720,720&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-22.userapi.com/s/v1/ig2/jCjxVviRy87vgLeAXFJGHQCHaxOu9HTgksbvf53450okk8BYB6rhTul2tJHB5DBo1n0wkEvluYIHdW1HgOvx_slF.jpg?quality=96&crop=427,0,1706,1706&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Павел', 'https://sun3-17.userapi.com/s/v1/ig2/8MYxgUF8SYTv-LPMD-NEVEe89MySxgr5LU8V8nZNwl2LHGsk4aQgVJaX4zUA0_X_gw_7e73QErkR8oi4SXoZ32jt.jpg?quality=95&crop=250,608,650,650&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Иван', 'https://sun3-22.userapi.com/s/v1/ig2/ssaL_ZonxjwKKF_4q-SgEfNYWvFJzz1eax-p9w-UE-2W6XFsouZcptgyeUurxyo98w5M5XD68cSb7iEyDW2qzAo4.jpg?quality=95&crop=1284,0,657,657&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Тимур', 'https://sun3-20.userapi.com/s/v1/ig1/O2naksC9gHkLKJmy9R0fdth2cPJMDiCulzFpX0qLZ3uqZwIJA_YvtkSer856BC0vqrWUdLxM.jpg?quality=96&crop=273,162,342,342&as=32x32,48x48,72x72,108x108,160x160,240x240&ava=1&cs=100x100'],
  ['Константин', 'https://sun3-17.userapi.com/s/v1/ig2/6ixJM-dLjoGg9_WnCb7zs8G9WGJDdLI_e5Rp2j6I4KidoZqCjui_5WlGh0SHqRki-S8uI0Ww-q3SIP_E2ZHcWEuP.jpg?quality=96&crop=456,398,507,507&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&cs=100x100'],
  ['Илья', 'https://sun3-13.userapi.com/s/v1/if2/JfEoC2_MzaJM-txrZIybVuM1NnwvYi-34C1qDAvrdxXwUmM99I2D6NnXuH3FCg6IMYoGkoDSXY2ZlaAsBy1zTr7a.jpg?quality=96&crop=7,0,1483,1483&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-24.userapi.com/s/v1/ig1/TnsvHMitaWmLwvmLmAtlvWN1L-_E7i-vAsPskozaesE_rj3oHMMRQGUIsF_kwsfCMnflGnY8.jpg?quality=96&crop=481,655,1126,1126&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Костя', 'https://sun3-22.userapi.com/s/v1/ig2/TlNVkuck0hszbJrsmDn3-RP1nvDbUhv_ebgSPc1WWL7tWvZyj9kWUna_fn2Q7Nq-2TQbz_kGmrBuuD3uZek234LQ.jpg?quality=95&crop=124,0,1448,1448&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Egor', 'https://sun3-22.userapi.com/s/v1/ig2/bsNgoYLY1Pm059oJm1G7N9FbpMObL3HVUWGbvRXKKs8QIr-3g7RDECpqs3SgEodDdEOMqF7P8DubC7C9nkjQBRV7.jpg?quality=95&crop=284,808,1192,1192&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Антон', 'https://sun3-18.userapi.com/s/v1/ig2/q5CGYbg_a_gTe61oZWlPYJyVjFUIaw7cci2ogEVQR8TFEm_QciYQbQ27jU7YQhvVbA3EAuV13uip0RFRAwGH4RvF.jpg?quality=96&crop=108,230,1152,1152&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-18.userapi.com/s/v1/if1/WPLCfXmnuEuaF9tjjPgHki53ZCdn3s_c_QpeDX8_R84u0PCAkcOjI-5VgZcAmRGRa68b9OuG.jpg?quality=96&crop=424,0,853,853&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Константин', 'https://sun3-23.userapi.com/s/v1/ig2/HQyyB5bH_DzwV0029WKhHdd69tomewxM_nB98G94LbVg_9PVwhWx_O8cpVcsgk8R8ammOVBUwpJVP8ucurMKDaT5.jpg?quality=95&crop=0,270,1620,1620&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Владислав', 'https://sun3-24.userapi.com/s/v1/if1/8mit77EH6CltlYYWARaNeiy031BzW99bvaQVYW7FSKHohh4OhWCgUiUCyNeGmz1NvwfvvBgG.jpg?quality=96&crop=269,268,1024,1024&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-22.userapi.com/s/v1/if1/C_HUGHveIbnOKGYElzQXXItBIDljO47q6H3JfV_eALYxuC2d0u2TfDB4e7ZSuSLgZgwJYPwA.jpg?quality=96&crop=0,161,959,959&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Иван', 'https://sun3-20.userapi.com/s/v1/ig2/nZfSWksydXUjbsomOAgGFZDy9Bs1WxpYyXTCNeDkIu0bXGsB6rY4RDk2sBIHgBf1OnX7pVNX1-nyFbgWnCzuygGu.jpg?quality=95&crop=4,368,1534,1534&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Андрей', 'https://sun3-20.userapi.com/s/v1/ig2/tMnFfNbig3YYnEjzOawr1QUpJXeQ53zN1GvYUeQLLmnPKLK2fQ9x64Hub-B1Df6Jg99mtPyVO5T9Cxp1GwSBDNxF.jpg?quality=95&crop=139,605,670,670&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Михаил', 'https://sun3-20.userapi.com/s/v1/ig2/y0kTjwueIcD_5q5ZxjwR9S_vtqWoI80ACpJ_IqLkZnwEYuykkG97yG0zNlB56xvSCthgKDOWlsth5nRKbNHKv-o_.jpg?quality=95&crop=0,0,640,640&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-12.userapi.com/s/v1/ig2/BZ2H7AKqU_IrwQyjuShx0RCAtxpI2QvMKMkPtyLmjf1qMtNuirH9nVwCnF1DV1wTXk6gm-MfqZs1E-8z7SzD97FF.jpg?quality=95&crop=0,422,1124,1124&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Ильяс', 'https://sun3-24.userapi.com/s/v1/if1/80pXT9S8F27BMGaULEkOkZTslvr9mvLSiPaUFr1hSrzUoXNDvaNTz2ff6ZO1Pn85EZ4NHPCQ.jpg?quality=96&crop=2,255,1431,1431&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Евгений', 'https://sun3-22.userapi.com/s/v1/if1/4-yki3eNCsM-3uuS8PvO8GiQ0CjiPUOKvT-PzY7-7Hcx4CUj0TjWq3gGbYaqm4iFP9f9ZGGA.jpg?quality=96&crop=0,397,1535,1535&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-23.userapi.com/s/v1/ig2/O95wUc-1XFlAw_-XTjLS3dO4EqDB4BjSC0dfXzX73Y3zCrex5ucBObYk-jSecsyj1CJVSyrG6W_OPaLE6lxWkKCg.jpg?quality=96&crop=356,395,807,807&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Рустам', 'https://sun3-22.userapi.com/s/v1/if1/MMPcbC1xXnfeRM15BzUEPuHyJ36BcZW4e_uuaJBrlX0QSn6hPHRY_XJpKrdPdpirGQud2W_w.jpg?quality=96&crop=88,0,403,403&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-23.userapi.com/s/v1/ig2/ryP8lysLXendQ6okLQmQXF8JQ6tKWmZADCJowr8kaIn4Kfh68sd_sqOniBJ5bREdbWfq6AZokKHZrbfu5R1pBbd_.jpg?quality=95&crop=325,409,902,902&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-11.userapi.com/s/v1/ig2/jyNIANRuTHMM5Q40t0Gh2KGqJXWUIkjmHXGxxSm7dOKhmGQlCQNMagEOLSZBkNCOBAu0qKbM-e90gyGJ38ZVU_aX.jpg?quality=96&crop=85,85,681,681&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Евгений', 'https://sun3-6.userapi.com/s/v1/if1/RjpA7aTWHUyl6a_DHSAqdg72-rZffSyW41PsMqY-Q00fLqs3Mhg6vyWXGO8rGUMjmtNKlTG6.jpg?quality=96&crop=0,102,960,960&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Витек', 'https://sun3-24.userapi.com/s/v1/if1/XtAVW576ac6FaM_K_g4VgxdaeDHXVDApMLQNai5OscWVdeXITZubPkIt00FsY2Fuq3ffuw.jpg?quality=96&crop=3,432,1211,1211&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Артур', 'https://sun3-20.userapi.com/s/v1/ig2/UUSIzjwkdGSOuzvHyZW29MpZ2BydMHYa7uDTlzIbUNKfG-VqIkOtKzwU9U3zGNHFpet25QGAgLb8M9AGHuBytcJB.jpg?quality=95&crop=148,0,837,837&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Dmitiry', 'https://sun3-24.userapi.com/s/v1/ig2/qJCs_BIN08_9Q-5siv2Y-nr_AJCSlNIEtyAN8fxe0iwDKwM6lNFzaC0vKDnnqKF7zmRl-4yg0x-37ybez4DJQXAP.jpg?quality=95&crop=193,460,479,479&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-23.userapi.com/s/v1/ig2/lWlVNeaI5NzmI8t4OP0BLegwu8alK3_dZTmE_C32_zyTlBSb-zEZS9nNSct3pvfBcTPhORWiNgg6KqmrDTpniOva.jpg?quality=95&crop=0,19,1170,1170&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-22.userapi.com/s/v1/ig2/swEWv0y_zl3HMWivhg4UaEYjvKxURVR9ougJ6XsFeczi16aAB8rrO13ktPh8qKY0iofW5x-SXIXgzA3oaoK99RDx.jpg?quality=95&crop=321,930,1020,1020&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Артем', 'https://sun3-20.userapi.com/s/v1/ig2/H2NRdxaUWcC3rTOR1AZIuE_2_PB3ETpQICxJs4CN6ptX7DPAz7UZ-gppRzld4jYrvJL5DEejTJV8L1OZzCkNZyMU.jpg?quality=95&crop=85,288,1354,1354&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-23.userapi.com/s/v1/if1/L_ELTaNjtJEOiQa8wX41mfa80KKYAe-VZlSl5n348fhucCTnjG-aCfoEO6262ROuMevsBPVM.jpg?quality=96&crop=3,5,711,711&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-22.userapi.com/s/v1/ig2/5K3hISCYBhcNozRQ-UfERsrZhyLNVUFR1BMvw3PKhZzwdZ0PQTm5Ga7bfO0PN6P3x_uHXypRoTkRNvaTUpoDo4bC.jpg?quality=95&crop=531,180,1196,1196&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Анатолий', 'https://sun3-23.userapi.com/s/v1/if1/dPh9FB4WLwonUWYrue1ASEy_S6HNVXtYOZ5zKIYMahYsyx-3YTErykDhCSyqvj9QvrVR78zu.jpg?quality=96&crop=0,0,1720,1720&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Руслан', 'https://sun3-3.userapi.com/s/v1/ig2/A3GIHQnmrwK76V2uATkhskmzbp9bm3MiJ6W3FFf07zI-_8TynWfop3n3VVFik9vikLvuNnadte4npHxrXMkNJFAD.jpg?quality=95&crop=408,618,1072,1072&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Кирилл', 'https://sun3-9.userapi.com/s/v1/ig2/sgkpSN6uNzKCoJ9yR6sOcvQi-3yCRYy0woRa0AV6bRQGErM1Zk4EUuRfmWiZ0_Ef_BIgdcw2u45jtt55MBbBV81T.jpg?quality=95&crop=284,70,714,714&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-22.userapi.com/s/v1/if1/PvhnDmAftCjnCagBu16hXbHOByMTbuT3CJQZulwxvnLFuudbx0pqJWltvdI9BQY2ACZ1Aw.jpg?quality=96&crop=89,495,949,949&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-20.userapi.com/s/v1/if2/5q_5k5eAvAVyKeYiMqAm547pKYTPu4j8vN_3NPAcC16Mvz3EBUxryBPIEad4dgjDMBfLC2eWoTQ63xwK4A-IL70n.jpg?quality=96&crop=0,126,1124,1124&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-17.userapi.com/s/v1/ig2/y3PVRpKjoV7VoCmgP2GJ1Mj1agSI_U8KmjJzeBKhJTeqYYeIaUlIGlSsYjhT9JCSnLPlTJ8jcOsubfCC-q-mm-CF.jpg?quality=95&crop=101,0,302,302&as=32x32,48x48,72x72,108x108,160x160,240x240&ava=1&cs=100x100'],
  ['Zviad', 'https://sun3-23.userapi.com/s/v1/ig2/VzJQSIrXxkVdLba4Jz5DkIGgy_yimCFWUXjPvEQjhUr58zpEb-f6kutTh1zKjbvbha5pwKn1aQ9KjfAFNCSPTiJq.jpg?quality=96&crop=96,96,768,768&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Евгений', 'https://sun3-18.userapi.com/s/v1/ig2/xFJDWmvn3deWC7RCM14jU0ZMjhBDOR-EMfdCZex958ehalSbXmnQ6ciRh9UqlfWngwTGPP0HQRN8OVVnXHuXaq-a.jpg?quality=95&crop=157,475,619,619&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Никита', 'https://sun3-16.userapi.com/s/v1/ig2/dSmaqHoVqvtTk7CpHcnehAchxSdn_o34YG1JXkQARtCILLwToCrW9TrvQZxm8Q9wUiYIKW-nGkqO2mMgLUgg-57t.jpg?quality=95&crop=132,75,507,507&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&cs=100x100'],
  ['Тимур', 'https://sun3-20.userapi.com/s/v1/if2/F1kRy0Rhpn6HW8zzGZSS9Cji_h6K46fNm_AncbEplhw4I7T7vIyxRbNS9RYBX4jkUiB5Rvujus1r_KoVp9jAQcm-.jpg?quality=96&crop=183,103,1107,1107&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Никита', 'https://sun3-18.userapi.com/s/v1/ig2/SLe163vapY0VPtsc2nMdc6nRQ_u0p1gWSL6X730b8O706Q_MExGH9H04Mrmop-6KEzz5Nw1a59hikJt-UtQ2NnN8.jpg?quality=96&crop=963,335,1097,1097&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-10.userapi.com/s/v1/ig2/Re3YRA3fHVvQR-G1kd2ORC-Zi00arzELsqN_MpGTY8fIxLoegp0kTKSb7nx-eVShJ0dVaiJ-ZfrYporlZcQHwO6D.jpg?quality=95&crop=375,504,1008,1008&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Артем', 'https://sun9-38.userapi.com/impf/c9925/u6828223/d_d9185a1b.jpg?quality=96&as=32x32,48x48,72x72&sign=372b8e628fb8a8e40ad8a7b46ea97ce6&cs=100x100'],
  ['Даниил', 'https://sun9-58.userapi.com/impf/c4276/u6817319/d_5d4be141.jpg?quality=96&as=32x32,48x48,72x72&sign=4c444bab8fd98edb22313ce6afba04c3&cs=100x100'],
  ['Александр', 'https://sun3-18.userapi.com/s/v1/ig1/VElnueDUoKBOJTnyR9lS2rRexESN9L0WeBr6PnaljRmNxxiopYCNaKt6pTVFjh-isOJzZHb4.jpg?quality=96&crop=0,0,1439,1439&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-18.userapi.com/s/v1/ig2/V-3GP4wdYWu5656u1ag3LkX--LOlt0j8tvd6HK5LLxEGLCjD6sI4bsTdJfAwyVB0iVGPSyIseVhV7HpLlsYLg4pb.jpg?quality=95&crop=87,0,1730,1730&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Руслан', 'https://sun3-7.userapi.com/s/v1/ig2/cUBjtHvlogHtRN_acUsgTF5FJq984GqV0to1t35jI5i1vVYyTBwt6_xUdm-7l_FMn8R7bVU_vqg-ieWXuvv3dT13.jpg?quality=95&crop=0,0,1324,1324&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Даниил', 'https://sun3-17.userapi.com/s/v1/ig2/DgJO3MSJd-FnO-iqbnZGEO9_0sh8XelTcD3Fu3Ifgp1Eam7APq2jGk4WfoJ9-ftZNS-2Ez1wRuWxFPASon3_fjV8.jpg?quality=96&crop=521,173,622,622&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Михаил', 'https://sun3-18.userapi.com/s/v1/if1/IpHVH67Rn2co81mIHYz6hmqH2ykNmFZidSY7dEndeWKf0j7E0puyaHIcMNbWHKoKSxgsPx6u.jpg?quality=96&crop=103,17,419,419&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-22.userapi.com/s/v1/ig2/IDe5wJ6YA_skTxKH1kJ_MBkFyxwluUz9aaWvcwGCDUMV3ObIC7TywUfS3gFYaUOHk7YCE35Q3uP-5vpHq0Od_9cu.jpg?quality=95&crop=0,24,960,960&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-24.userapi.com/s/v1/if2/DNhzCuwCExVVPnIka9b2b7KqOn3XEsKZ8Lhzt1aCYv-pLEK9zGJXnUWPuBHkWBizpRmyFPTaJelN577TFNQJKTWK.jpg?quality=96&crop=0,59,200,200&as=32x32,48x48,72x72,108x108,160x160&ava=1&cs=100x100'],
  ['Егор', 'https://sun3-24.userapi.com/s/v1/ig2/G8-Jn4lwU87kbj-0u7v-5YhsXDk9YPnmChwrz-ncJUwEgCCh9n-GmD96I42Q7dNhvANnghuSCS1k1hia0xENhXD-.jpg?quality=96&crop=72,72,580,580&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Артем', 'https://sun3-20.userapi.com/s/v1/if1/8n0z25iIJa5Wc1-6JgHczwzmzwUedSQrh1arQTA8lV0yDLzIZ0cMeekFzaoCt0dd16Rrylbe.jpg?quality=96&crop=0,288,864,864&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-24.userapi.com/s/v1/ig2/iBKmjI-PxcNhe7qU3aLhst5UU8_7Ogkw8pD94M3Cp2RfdHg4YHEkg5eQY88vfjGWPlznuFUdPXf_MdxTcHCX3BKA.jpg?quality=95&crop=144,162,1152,1152&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Антон', 'https://sun3-4.userapi.com/s/v1/ig2/xuh4j2FiY1EAatYcKStjpB5ZuSP0b_xFWA1DS6OvKaTdDSMITd3OTU5v1hLz4bhByuQBr7YGbCg_bjT1YbCJvzKg.jpg?quality=95&crop=2,736,1078,1078&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Иван', 'https://sun3-7.userapi.com/s/v1/ig2/yrjV7GE-fWeHj-N4KTnuDeg_afialyW_yLyAKA6dmigVSvl5Wsud8joF-XBePjo-68lL1YVAfwDShkScy6ambZfS.jpg?quality=95&crop=220,0,1920,1920&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Oleg', 'https://sun3-17.userapi.com/s/v1/if1/zN3YrS8Me_N4pqzb2jIMud4iECdZR5WP4Av9HK6c_nHT02KPv3nQ7s-XeqDmkuIV42PVm3wG.jpg?quality=96&crop=0,0,1080,1080&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Nikita', 'https://sun3-24.userapi.com/s/v1/ig2/XfnywX_Adk31ZZAW-Gv0_wS4rowIv74Hxb6z4FSFjmaxv7FEEMM4YByAPyAWDtCd2i5-bq-Vk_PHcJIZ_ldrzeL1.jpg?quality=95&crop=924,152,944,944&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Михаил', 'https://sun3-20.userapi.com/s/v1/if1/xh69bDi_fHafTDoLA_jl6KUj4_zWZfmDkyP6fyhc6pzdZlK9s3KKLhsqUB9BlC-ABenlhUd0.jpg?quality=96&crop=5,5,1202,1202&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-24.userapi.com/s/v1/ig2/7DhCfvSFaueitwRv-grsAY_l3z9FV6DEOwpcZGYlgp6IVw3Uo-GzeJF3Sz0uoyaZqwWqVESL2TZO0xOPVcj9zdCp.jpg?quality=95&crop=48,28,1409,1409&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280&ava=1&cs=100x100'],
  ['Вадим', 'https://sun3-17.userapi.com/s/v1/ig2/-2iR3krQx6maCsugvUUCAaKtmYh02QP0TX7aiw26gfi3NChJEDPF8JNJId713dozQlKrU9kndFiUBQRBRjvDl8s_.jpg?quality=96&crop=812,506,810,810&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Антон', 'https://sun3-23.userapi.com/s/v1/if2/_v-hDMrChOFI4FRMDCi8NBDTcwt3nxuDVMfdJia0aT_ShOT9Eby0d5qR3Qtqqrs6EGJRZbmZtFxv4tCSo4YgKUDJ.jpg?quality=96&crop=217,121,546,546&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Сергей', 'https://sun3-17.userapi.com/s/v1/ig2/FQsPLYxBF5KB8w2WDOyZ6VqdSZUIyF0Duu7XxSKwD2ZHnRvLXlQN46-RCq8Qnoem7LpT2hw0n0y-F4PWRg-3HSkn.jpg?quality=95&crop=306,410,686,686&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Александр', 'https://sun3-22.userapi.com/s/v1/ig2/7TTpVcMix62K0Y3FvqRejnbhuftNuy_62aIUqx6mIsFtEQ8kp7PNSIFi94hVU1D0tlVVBZhSEKk5lnMAB7ieTy4P.jpg?quality=95&crop=0,224,640,640&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Николай', 'https://sun3-10.userapi.com/s/v1/ig2/LPt_orGMyGZWLzgyJ_VrA6dYLxltiPnJn3zlXwA7p6DRneVh5r44BjKwg-EmNvwa5NN6xmpkbotMvgZGQ_s-u5qx.jpg?quality=96&crop=136,123,980,980&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Павел', 'https://sun3-23.userapi.com/s/v1/ig2/tY-Sd-hSEoxdUc_2yiaKjKUngB_ggYBJRHR7WLaw47AhW3vxi3CsTHcE_MTjRLJiXAXBPL4Pv8msFGSX6p7aUlPE.jpg?quality=96&crop=59,78,648,648&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Илья', 'https://sun3-22.userapi.com/s/v1/ig2/zEtwMRI_TVvz1arAY84LxML0vNIsT-Oxph-QWGBDsSRl6e7sBp7WiTcW_tLAJhjTXO4AiwsvzSmOC60di98vMtbQ.jpg?quality=95&crop=422,820,771,771&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Олег', 'https://sun3-7.userapi.com/s/v1/if2/iJZJzAziIIukFf8ibfzrYnsWBqSglFiBq6xAvOyX0MVskBYBnCyqm2UXY8zZYL8aI_fEWOZ3QQEz_pgD77EVLTSa.jpg?quality=96&crop=791,371,851,851&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-17.userapi.com/s/v1/ig2/73mJVBijkRCVnVa5-PKBs_UNq97Gh8pPF8NkUMzylsPfO7jTk6-YU-kSI50alLBj2cgX4xDOy-D2AFqj4pAFMl7M.jpg?quality=96&crop=345,157,551,551&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-24.userapi.com/s/v1/if1/jAM4Przux7AByuhXdXmMxmiyWdwZ85OfGd-jaDcvDAOKP8VB0pXuBpZsHtpOX0PzTyoBIg.jpg?quality=96&crop=0,25,469,469&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Алексей', 'https://sun3-24.userapi.com/s/v1/ig2/sJ8M4BzxkJHsWuuotzEvOFgT4qeetou71LFjR59D1lSXLSR_MydGzXcAkPr7QXgO0jRIEhfO7uz-1qzYugthfsgP.jpg?quality=96&crop=108,206,968,968&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Константин', 'https://sun3-18.userapi.com/s/v1/if1/Hn5ZieXWrsxzgA2-JdAXlPVAndJBDn-lcItDlXJLRQyiS0iAYb-slNU1UJqjwWflHEfk9XI0.jpg?quality=96&crop=174,1,853,853&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Андрей', 'https://sun3-17.userapi.com/s/v1/ig2/9tLxbTVr1LFcbSn8_LoC1K77yfo2nPowHgOb0qSDQmJVPzGPWb6YCpaScdSEJK1Ymhd_X7MsyaSGTYz9gMjYfmsy.jpg?quality=95&crop=217,316,479,479&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Леонид', 'https://sun3-11.userapi.com/s/v1/ig2/y4iovqPhfXhGvw827EFC76RdXiD2eV0EbguMhsJwjV6vpAIoNNwhYy-wkpy68TvmZKkziK07gLwfSFja6Po-kAXi.jpg?quality=95&crop=636,26,921,921&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Василий', 'https://sun3-23.userapi.com/s/v1/if2/eZZ1BeZNEy1wG11mBroAD-fSk3NXe-yPtIyqpktRY8fmk8C1N-3ao53rCr59BkyCnHtNTTBVGiyrRK1283Obq2D_.jpg?quality=96&crop=0,15,525,525&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&cs=100x100'],
  ['Антон', 'https://sun3-20.userapi.com/s/v1/ig2/iAn1o7o-agH1TINirKmaCkm7Rumg1i6teRdKEUaZiST7L_M3OIM9mKdUN5WseeG7_NA7_2T5pjCUiij0h5LGwIVk.jpg?quality=95&crop=408,566,1157,1157&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Виталий', 'https://sun3-20.userapi.com/s/v1/if1/ZisMNVAz3wPSJd9zc3cHoCgggeEnQYLw3l3jj-yTCCKGmZIcnxm2DGdEND2i5qbNFBlQ9IVv.jpg?quality=96&crop=0,177,644,644&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Максим', 'https://sun3-18.userapi.com/s/v1/ig2/FFYmOEu-0ke6zlbQFO_rNjvFGZR3G7AvsorfN0JMWctPL2UqZtJX4MZe-i5mLsqRdCZcqpqwYdeNOByqGpiQhh58.jpg?quality=95&crop=496,40,1024,1024&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Илья', 'https://sun3-17.userapi.com/s/v1/if1/rfj_bbyWvG3hMLAojF68uPkfb-uRrW4UxxDoCk_r0KiWKcFm0rMZkmvUM6W9Yk8mN2iq_CY9.jpg?quality=96&crop=197,131,1132,1132&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Рустам', 'https://sun3-11.userapi.com/s/v1/ig2/cQyis1g05N7lL8uWK24l57TpIaNtWuEN63Uhe5SGN0JchbpspCmXBDAD-DivU61vp6LjIOia6ivVwS85pvSfNMdm.jpg?quality=95&crop=328,216,847,847&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Роман', 'https://sun3-24.userapi.com/s/v1/ig2/F5aj7e7YNyYF3dUFjnhzpogRoLr4YxfLvIJjzJQdJSWMjcXHQTSp5wT-HhJOC-mI6nPz3tzC_Ol7jePk6uiaDdtb.jpg?quality=95&crop=0,401,1920,1920&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100'],
  ['Роман', 'https://sun3-22.userapi.com/s/v1/ig2/tbnDpMfs2_cW0jj5quVfgPc15XU-8DyIblOg9s-Awi8U5rAA_isgvheBJHWNSzbYVHEsQ47cnwfeibepY4pivO1M.jpg?quality=95&crop=200,500,1021,1021&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100'],
  ['Матвей', 'https://sun3-18.userapi.com/s/v1/ig2/-RuiO4K7Yw07zk253pQIaR3nbEoGsQGhzUsmNp7LyGgGy_ANm3-yG-Mju1A_Phbhkir2ufnwrVaZhAVj6Tq0puTl.jpg?quality=95&crop=264,590,539,539&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-24.userapi.com/s/v1/if1/HUnCfpbctDhnBDEte4-J0voAKGq36V_zvymGvMbtrdGFY0PTMFAzvXEZgIXsPmuxWWU3-N9b.jpg?quality=96&crop=72,72,576,576&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Михаил', 'https://sun3-10.userapi.com/s/v1/if2/eeNS-cQf1776_-0q_OG5nI0vQTQLqI94T8lk_DIYQV7-F0r37l3PguZkXt_mgX3Un5B0QxYh-i4h9z1sqFc-spo1.jpg?quality=96&crop=120,120,705,705&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Станислав', 'https://sun3-18.userapi.com/s/v1/ig2/CYLcRWuDxsfOzgaQXNw5eqkndDGj5CaUtp1__NirstuDg_8un1gL-YaQ2vNnDJnnFTt1fzeiRoN61AhRYKcyzUbe.jpg?quality=95&crop=622,475,434,434&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100'],
  ['Илья', 'https://sun3-20.userapi.com/s/v1/if1/MpC3izmP7kh2_HdfNo61b1w1ZZ1WEJPwk4pl7Dcy1P1lUhnfwzdvOrOiK0WyjGxl6OtGrN0Q.jpg?quality=96&crop=556,50,1271,1271&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-12.userapi.com/s/v1/ig2/GqVmZco_3jCCbWmaHv5-9pFjwofW80eX6OAfocMoQy2zte1XRzd2CT-F3Ol47ZKkEPJuZRJkHn7JEns6vXE2GQ5x.jpg?quality=95&crop=554,15,634,634&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Дмитрий', 'https://sun3-20.userapi.com/s/v1/if1/gjvVtJFe4jjeHf9Hqj0kQcV5quIaOeE5yFDNudu2qyYPH-zUcH-3ibaqzp5zDjGsiJ_SreOc.jpg?quality=96&crop=0,35,627,627&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100'],
  ['Егор', 'https://sun3-12.userapi.com/s/v1/ig2/MoDBOvvtAIygrKnfjLjSr8G32xgvg88a5uHK5xmk3e2wYnRmEY0d0p0oMUD6orFxltQN3_RSPXGEgTQU3bBNZ6Qi.jpg?quality=95&crop=3,212,1144,1144&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=100x100'],
  ['Владимир', 'https://sun3-8.userapi.com/s/v1/ig2/y1S6zVTtmXnJpP2tosz8qwvUETyPqWL_YoXqGAeSFK5jtyctayDeqMeG1w10izfrDhoDo7Tdn14L5UrqJYqLradn.jpg?quality=96&crop=85,85,678,678&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640&ava=1&cs=100x100'],
  ['Павел', 'https://sun3-20.userapi.com/s/v1/if1/Wm8JiivDDau6wmywxD0JSG3PbOQkuzN7A2nsSAdyfDqm5sc5Q0nV0FykRgsQZJPhotme_Ti-.jpg?quality=96&crop=1,368,1618,1618&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100']
]

let selectedEnemies = [-1];

async function findEnemy(/*enemyAva: HTMLImageElement*/): Promise<Player> {
  let randomNumber;
  let lenghEnemies = enemies.length;
  randomNumber = randomInt(lenghEnemies-1);
  //чтоб не попадался один и тот же соперник
  //важно очищать при игре заново
  while(selectedEnemies.includes(randomNumber)){
    randomNumber = randomInt(lenghEnemies-1);
  }

  selectedEnemies.push(randomNumber);
  const img = new Image()
  img.src = enemies[randomNumber][1];
  enemyPlayer = {ava: img, name: enemies[randomNumber][0]}

  return awaitValue(1500, enemyPlayer)
}

type RockPaperScissors = 'rock' | 'paper' | 'scissors'
function rockPaperScissors(): RockPaperScissors {
  const r = randomInt(2)
  if (r === 0) return 'rock'
  if (r === 1) return 'paper'
  return 'scissors'
}
type BattleResult = 'win'|'draw'|'defeat'
function getBattleResult(you: RockPaperScissors, enemy: RockPaperScissors): BattleResult {
  const variants = {
    rock: {
      rock: 'draw',
      scissors: 'win',
      paper: 'defeat',
    } as const,
    scissors: {
      rock: 'defeat',
      scissors: 'draw',
      paper: 'win',
    } as const,
    paper: {
      rock: 'win',
      scissors: 'defeat',
      paper: 'draw',
    } as const,
  } as const
  return variants[you][enemy]
}

type GameResult = 'battleWin' | 'battleDraw' | 'battleLost' | 'tourWin' | 'gameLost' | 'gameWin'

const nameToImg = (rock: string, scissors: string, paper: string)=>({
  null: rock,
  rock: rock,
  scissors: scissors,
  paper: paper,
})

const timeOfSingleShake = 700 // ms
const fullShakeAnim = timeOfSingleShake*(2+2/3)

type GamesState = 'search'|'start'|'game'|'end'|'next'

const GameScreen =
React.memo(
()=>{
  
  const { resources } = useRecoilValue(AppRecoil)
  
  const tourData = {
    tourLevel: 20, //TODO извлекать из глобальной переменной
    playerAva: resources.playerAva.image,
    playerName: window.localStorage['playerName'],
  }
  
  const [play] = useSound(resources.swing.dataUrl,{
    onload: () => { console.log('sound was loaded') }
  })
  
  const [gameState, setGameState] = useState<GamesState>('search')
  const [tourNumber, setTourNumber] = useState(1)
  
  const [enemy, setEnemy] = useState<Player|null>(null)
  
  const [enemyChoice, setEnemyChoice] = useState<RockPaperScissors | null>(null)
  const [playerChoice, setPlayerChoice] = useState<RockPaperScissors | null>(null)
  const selectAction = (action: RockPaperScissors)=>{
    if (gameState==='start') setPlayerChoice(action)
  }
  
  const [enemyPts, setEnemyPts] = useState(0)
  const [playerPts, setPlayerPts] = useState(0)
  
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null)
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  
  useEffect(()=>{
    if (gameState==='search') {
      findEnemy().then(it=>{
        setEnemy(it)
        setGameState('start')
      })
    }
  }, [gameState])
  useEffect(()=>{
    if (playerChoice) {
      setGameState('game')
      setEnemyChoice(rockPaperScissors())
    }
  }, [playerChoice])
  const endGame = ()=>{
    const result = getBattleResult(playerChoice!, enemyChoice!)
    if (result==='win') setPlayerPts(playerPts+1)
    if (result==='defeat') setEnemyPts(enemyPts+1)
    setBattleResult(result)
    setGameState('end')
  }
  useEffect(
    ()=>{
      if (gameState==='game'){
        const timerId = setTimeout(endGame, fullShakeAnim)
        return ()=>clearTimeout(timerId)
      }
    },
    [gameState]
  )
  
  useEffect(()=>{
    if (gameState==='end'){
      if (enemyPts<2 && playerPts<2) {
        if (battleResult==='win') setGameResult('battleWin')
        if (battleResult==='draw') setGameResult('battleDraw')
        if (battleResult==='defeat') setGameResult('battleLost')
      }
      else if (enemyPts>=2) setGameResult('gameLost')
      else if (playerPts>=2) {
        if (tourNumber < tourData.tourLevel) setGameResult('tourWin')
        if (tourNumber === tourData.tourLevel) setGameResult('gameWin')
      }
      const timerId = setTimeout(()=>setGameState('next'), 3000)
      return ()=>clearTimeout(timerId)
    }
  }, [gameState])
  
  const skip = ()=>{
    if (gameState==='end') setGameState('next')
  }
  
  const next = ()=>{
    if (['battleWin', 'battleDraw', 'battleLost'].includes(gameResult as GameResult)) {
      setGameState('start')
      setPlayerChoice(null)
      setEnemyChoice(null)
      setBattleResult(null)
      setGameResult(null)
    }
    else if ('gameLost'===gameResult) {
      setGameState('search')
      setTourNumber(1)
      setEnemy(null)
      setPlayerChoice(null)
      setEnemyChoice(null)
      setEnemyPts(0)
      setPlayerPts(0)
      setBattleResult(null)
    }
    else if ('tourWin'===gameResult) {
      setGameState('search')
      setTourNumber(tourNumber+1)
      setEnemy(null)
      setPlayerChoice(null)
      setEnemyChoice(null)
      setEnemyPts(0)
      setPlayerPts(0)
      setBattleResult(null)
    }
    else if ('gameWin'===gameResult) { /* go to /main-menu */ }
  }
  
  
  
  const [resultMsg, resultDescription, resultAction] = function(){
    if (gameResult==='battleWin') return ['Победа', '', 'Продолжить']
    if (gameResult==='battleDraw') return ['Ничья', '', 'Продолжить']
    if (gameResult==='battleLost') return ['Проигрыш', '', 'Продолжить']
    if (gameResult==='gameLost') {
      //очищаем список
      selectedEnemies = []
      return ['Вы проиграли', '', 'Начать заново']
    }  
    if (gameResult==='tourWin') return ['Вы победили!', '', 'Следующий тур']
    if (gameResult==='gameWin') return [
      'Вы выиграли!',
      'Админ свяжется с вами для вручения приза.',
      'Главное меню'
    ]
    return ['', '']
  }()
  
  
  const leftHandProps = function(){
    const img = ['end','next'].includes(gameState)
      ? nameToImg(resources.rock.dataUrl, resources.scissors.dataUrl, resources.paper.dataUrl)[enemyChoice + '']
      : resources.rock.dataUrl
    return {
      src: img,
      isShrink: img===resources.rock.dataUrl,
    }
  }()
  const rightHandProps = function(){
    const img = ['end','next'].includes(gameState)
      ? nameToImg(resources.rock.dataUrl, resources.scissors.dataUrl, resources.paper.dataUrl)[playerChoice + '']
      : resources.rock.dataUrl
    return {
      src: img,
      isShrink: img===resources.rock.dataUrl,
    }
  }()
  
  const onAnimation = (ev: React.AnimationEvent)=>{
    if ([shakeLeftAnim.name, shakeLeftLastAnim.name,
      shakeRightAnim.name, shakeRightLastAnim.name].includes(ev.animationName)) {
      void awaitCallback(timeOfSingleShake*0.33, play)
    }
  }
  
  
  
  const statusBarRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    const sBar = statusBarRef.current!
    const img = function(){
      if (gameState!=='search'){
        console.log("gameState!==search")
        return enemyPlayer.ava;
      }        
      const img = new Image()
      img.src = resources.unknownAva.dataUrl
      return img
    }()
    img.style.minHeight = '0'
    img.style.minWidth = '0'
    img.style.height = '100%'
    img.style.width = 'auto'
    img.style.aspectRatio = '1'
    img.style.backgroundSize = 'cover'
    img.style.backgroundPosition = 'center'
    img.style.borderRadius = '999999px'
    sBar.prepend(img)
    return ()=>void sBar.removeChild(img)
  },[gameState])
  useLayoutEffect(()=>{
    const sBar = statusBarRef.current!
    const img = resources.playerAva.image/* .cloneNode() as HTMLImageElement */
    img.style.minHeight = '0'
    img.style.minWidth = '0'
    img.style.height = '100%'
    img.style.width = 'auto'
    img.style.aspectRatio = '1'
    img.style.backgroundSize = 'cover'
    img.style.backgroundPosition = 'center'
    img.style.borderRadius = '999999px'
    sBar.append(img)
    return ()=>void sBar.removeChild(img)
  },[])
  
  
  
  
  return <Pages.Page>
    <Pages.ContentClampAspectRatio>
      
      
      <Content onClick={skip}>
        <Bgc />
        <Rays src={resources.rays.dataUrl} isRotating={gameState==='end'}/>
        
        
        {gameState!=='search' && <HandContainer
          isShaking={gameState==='game'}
          isShowResult={['end','next'].includes(gameState)}
        >
          <Hand
            {...leftHandProps}
          />
        </HandContainer>}
        
        <HandContainer
          isRight
          isShaking={gameState==='game'}
          isShowResult={['end','next'].includes(gameState)}
          onAnimationStart={onAnimation}
          onAnimationIteration={onAnimation}
        >
          <Hand
            {...rightHandProps}
            isRight
          />
        </HandContainer>
        
        <PageBackBtn />
        
        <Layout>
          
          <StatusBar ref={statusBarRef}>
            
            {/* { gameState==='search' && <Ava
              style={{ backgroundImage: resources.unknownAva.dataUrl }}
            />} */}
            
            <NameContainer>
              <Name>
                {gameState==='search' ? 'Поиск достойного противника...' : enemy!.name}
              </Name>
            </NameContainer>
            <PtsContainer><Pts>{enemyPts}</Pts></PtsContainer>
            <Tour>
              <div>Тур</div>
              <div>{tourNumber}/{tourData.tourLevel}</div>
            </Tour>
            <PtsContainer><Pts>{playerPts}</Pts></PtsContainer>
            <NameContainer><Name>{tourData.playerName}</Name></NameContainer>
            
            {/* <Ava style={{ backgroundImage: tourData.playerAva }} /> */}
            
          </StatusBar>
          <div/>
          {['search','start'].includes(gameState) && <ActionBar>
            <ActionButton
              img={resources.btnRock.dataUrl}
              activeImg={resources.btnRockActive.dataUrl}
              isActive={playerChoice==='rock'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('rock')}
            />
            <ActionButton
              img={resources.btnScissors.dataUrl}
              activeImg={resources.btnScissorsActive.dataUrl}
              isActive={playerChoice==='scissors'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('scissors')}
            />
            <ActionButton
              img={resources.btnPaper.dataUrl}
              activeImg={resources.btnPaperActive.dataUrl}
              isActive={playerChoice==='paper'}
              isFaded={['search'].includes(gameState)}
              onClick={()=>selectAction('paper')}
            />
          </ActionBar>}
          
        </Layout>
      </Content>
      
      
      {gameState==='next' && <ResultDialogFrame>
        <ResultDialog>
          <ResultDescription>
            <div>{resultMsg}</div>
            {resultDescription && <div>{resultDescription}</div>}
          </ResultDescription>
          {gameResult==='gameWin' && <Link to={'/main-menu'}>
            <Button css={ButtonStyle.button}
              style={{ backgroundImage: `url(${resources.buttonBgc.dataUrl})` }}
            >
              {resultAction}
            </Button>
          </Link>}
          {gameResult!=='gameWin' && <Button css={ButtonStyle.button} onClick={next}
            style={{ backgroundImage: `url(${resources.buttonBgc.dataUrl})` }}
          >
            {resultAction}
          </Button>}
        </ResultDialog>
      </ResultDialogFrame>}
      
      
    </Pages.ContentClampAspectRatio>
  </Pages.Page>
})
export default GameScreen


const Content = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
`


const Bgc = styled.div`
  ${abs};
  background: #004bbc;
`

const Rays = styled.img<{ isRotating: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: auto;
  translate: -50% -50%;
  scale: 2;
  ${p=>p.isRotating && css`animation: ${rotateAnim} 5s linear infinite`};
`


const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;
  gap: 10px;
  padding: 20px 60px 10px 60px;
`


const StatusBar = styled.section`
  ${row};
  border-radius: 20px;
  background: #00000055;
  height: 80px;
  padding: 6px;
`
const Ava = styled.div`
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 999999px;
`
const NameContainer = styled.div`
  height: 100%;
  flex:1;
  padding-left: 10px;
  padding-right: 10px;
  ${center};
`
const Name = styled.div`
  ${Txt.large2};
  line-height: 129%;
  overflow-wrap: anywhere;
  text-align: center;
`

const PtsContainer = styled.div`
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  ${center};
`
const Pts = styled.div`
  ${Txt.large6};
`

const Tour = styled.div`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background: white;
  display: grid;
  grid-template-rows: auto auto;
  place-content: center;
  justify-items: center;
  color: black;
  ${Txt.large2};
  line-height: 129%;
`


const shakeLeftAnim = keyframes`
  0% { rotate: 0turn }
  33% { rotate: -0.05turn }
  66% { rotate: 0.05turn }
  100% { rotate: 0turn }
`
const shakeLeftLastAnim = keyframes`
  0% { rotate: 0turn }
  50% { rotate: -0.05turn }
  100% { rotate: 0.05turn }
`
const shakeRightAnim = keyframes`
  0% { rotate: 0turn }
  33% { rotate: 0.05turn }
  66% { rotate: -0.05turn }
  100% { rotate: 0turn }
`
const shakeRightLastAnim = keyframes`
  0% { rotate: 0turn }
  50% { rotate: 0.05turn }
  100% { rotate: -0.05turn }
`
const HandContainer = styled.div<{
  isRight?: boolean
  isShaking: boolean
  isShowResult: boolean
}>`
  position: absolute;
  bottom: 0;
  top: 40%;
  width: 200%;
  ${p=>!p.isRight && css`left: -100%;`};
  ${p=>p.isRight && css`right: -100%;`};
  ${p=>p.isShaking && !p.isRight && css`
    animation:
      ${shakeLeftAnim} ${timeOfSingleShake}ms linear 2,
      ${shakeLeftLastAnim} ${timeOfSingleShake*2/3}ms linear 1 forwards;
    animation-delay: 0ms, ${timeOfSingleShake*2}ms;
  `};
  ${p=>p.isShaking && p.isRight && css`
    animation:
      ${shakeRightAnim} ${timeOfSingleShake}ms linear 2,
      ${shakeRightLastAnim} ${timeOfSingleShake*2/3}ms linear 1 forwards;
    animation-delay: 0ms, ${timeOfSingleShake*2}ms;
  `};
  ${p=>p.isShowResult && !p.isRight && css`rotate: 0.05turn`}
  ${p=>p.isShowResult && p.isRight && css`rotate: -0.05turn`}
`
const Hand = styled.img<{
  isRight?: boolean
  isShrink: boolean
}>`
  position: absolute;
  bottom: 20%;
  ${p=>!p.isRight && css`left: 54%;`};
  ${p=>p.isRight && css`right: 54%;`};
  height: calc(90% * ${p=>(p.isShrink ? 0.85 : 1)});
  width: auto;
  ${p=>p.isRight && css`scale: -1 1;`};
`




const ActionBar = styled.section`
  height: 80px;
  ${row};
  justify-content: center;
  gap: 50px;
`
const ActionButton = styled(Button)<{
  img: string
  activeImg: string
  isActive: boolean
  isFaded: boolean
}>`
  ${ButtonStyle.gameAction};
  background-image: url(${p=>p.isActive ? p.activeImg : p.img});
  
  ::after {
    content: '';
    ${abs};
    border-radius: inherit;
    ${p=>p.isFaded && css`background: #00000088`};
  }
`



const ResultDialogFrame = styled.section`
  ${abs};
  padding: 120px 100px 20px 100px;
  ${center};
`
const ResultDialog = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #000000cc;
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  gap: 14px;
`
const ResultDescription = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  place-items: center;
  color: white;
  ${Txt.large4};
  line-height: 129%;
  text-align: center;
`
