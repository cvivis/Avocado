package com.avocado.Item.service;

import com.avocado.Item.controller.dto.ConsignRequestDto;
import com.avocado.Item.controller.dto.MySaleDetailResponseDto;
import com.avocado.Item.controller.dto.MySaleResponseDto;
import com.avocado.Item.controller.dto.MySaleResponseEntries;
import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.Item.domain.repository.MySaleResponseMapping;
import com.avocado.live.domain.Broadcast;
import com.avocado.live.service.BroadcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final NormalAuctionService normalAuctionService;
    private final LiveAuctionService liveAuctionService;
    private final BroadcastService broadcastService;

    // 위탁 요청 물품 등록
    @Transactional
    public boolean saveItem(ConsignRequestDto consignRequestDto) {
        try {
            itemRepository.save(Item.builder()
                    .name(consignRequestDto.getName())
                    .content(consignRequestDto.getContent())
                    .thumbnail(consignRequestDto.getThumbnail())
                    .hopePrice(consignRequestDto.getHopePrice())
                    .type(consignRequestDto.getType())
                    .itemStatus(consignRequestDto.getItemStatus())
                    .build());
            return true;
        } catch (Exception e) {

        }
        return false;
    }

    // 나의 위탁 물품 리스트 가져오기
    public MySaleResponseDto getMySales(Long memberId) {
        List<MySaleResponseMapping> items = itemRepository.findItemsByMemberId(memberId);
        List<MySaleResponseEntries> entries = items.stream().map(MySaleResponseEntries::new)
                .collect(Collectors.toList());

        return new MySaleResponseDto(entries);
    }

    // 나의 위탁 상시경매 물품 상세보기
    public MySaleDetailResponseDto getMyNormalSale(Long itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        Item item = optionalItem.get();

        // 상품id를 통해 상시경매 데이터를 가져오는 서비스가 만들어져야 함
        NormalAuction normalAuction = NormalAuctionService.getNormalAuction(itemId);

        return new MySaleDetailResponseDto(item, normalAuction);
    }

    // 나의 위탁 라이브경매 물품 상세보기
    public MySaleDetailResponseDto getMyLiveSale(Long itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        Item item = optionalItem.get();

        // 상품id를 통해 라이브경매 데이터를 가져오는 서비스가 만들어져야 함
        LiveAuction liveAuction = LiveAuctionService.getLiveAuction(itemId);
        Long broadcastId = liveAuction.getBroadcastId();

        // 방송id를 통해 방송 데이터를 가져오는 서비스가 만들어져야 함
        Broadcast broadcast = BroadcastService.getBroadcast(broadcastId);

        return new MySaleDetailResponseDto(item, liveAuction, broadcast);
    }
}
